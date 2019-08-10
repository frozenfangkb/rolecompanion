$(document).ready(() => {

    let devices = null
    let voicemeeterDevices = null

    ipcRenderer.send('getAudioDevices');
    ipcRenderer.on('receiveAudioDevices', (event, args) => {

        devices = args
        args.forEach((device) => {

            $('#mainAudio').append('<option value="'+device.id+'">'+device.name+'</option>')

        })

    });

    ipcRenderer.send('getAudioVMDevices');
    ipcRenderer.on('receiveAudioVMDevices', (event, args) => {

        voicemeeterDevices = args
        args.forEach((device) => {

            $('#secondaryAudio').append('<option value="'+device.id+'">'+device.name+'</option>')

        })

    });

});