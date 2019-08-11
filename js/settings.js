$(document).ready(() => {

    let devices = null;
    let voicemeeterDevices = null;

    ipcRenderer.send('getAudioDevices');
    ipcRenderer.on('receiveAudioDevices', (event, args) => {

        devices = args;
        args.forEach((device) => {

            $('#mainAudio').append('<option value="'+device.id+'">'+device.name+'</option>')

        })

    });

    ipcRenderer.send('getAudioVMDevices');
    ipcRenderer.on('receiveAudioVMDevices', (event, args) => {

        voicemeeterDevices = args;
        args.forEach((device) => {

            $('#secondaryAudio').append('<option value="'+device.id+'">'+device.name+'</option>')

        })

    });

    ipcRenderer.send('loadConfig');
    ipcRenderer.on('getConfig', (event, args) => {

        if(args == null || (args.mainAudioDeviceID === 'Not defined' || args.mainAudioDeviceName === 'Not defined' || args.secondaryAudioDeviceID === 'Not defined' || args.secondaryAudioDeviceName === 'Not defined')) {
            console.log("Couldn't find correct config. Setting to default.");
        } else {
            console.log("Config file found, setting to correct values.");
            $('#mainAudio').val(args.mainAudioDeviceID);
            $('#secondaryAudio').val(args.secondaryAudioDeviceID);
        }

    });

    $('#saveSettings').click(() => {

        let mainAudioDeviceID = $('#mainAudio option:selected').val();
        let mainAudioDeviceName = $('#mainAudio option:selected').text();

        let secondaryAudioDeviceID = $('#secondaryAudio option:selected').val();
        let secondaryAudioDeviceName = $('#secondaryAudio option:selected').text();

        let audioObject = {
            "mainAudioDeviceID": mainAudioDeviceID,
            "mainAudioDeviceName": mainAudioDeviceName,
            "secondaryAudioDeviceID": secondaryAudioDeviceID,
            "secondaryAudioDeviceName": secondaryAudioDeviceName
        };

        ipcRenderer.send('setAudioDevices', audioObject);
        ipcRenderer.on('configUpdate', (event,args) => {

            if(args == 'ok') {
                alertify.notify("Configuración actualizada correctamente", 'success', "5");
            } else {
                alertify.notify("Error actualizando la configuración", 'error', "5");
            }

        });

    });

});