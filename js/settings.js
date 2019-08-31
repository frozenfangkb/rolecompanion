$(document).ready(() => {

    let devices = null;
    let voicemeeterDevices = null;

    ipcRenderer.send('getAudioDevices');

    ipcRenderer.send('getAudioVMDevices');

    ipcRenderer.send('loadConfig');

    $('#saveSettings').click(async () => {

        let mainAudioDeviceID = $('#mainAudio option:selected').val();
        let mainAudioDeviceName = $('#mainAudio option:selected').text();
        let mainAudioChannelCount = 0;
        let mainAudioSampleRate = 0;

        await devices.forEach((device) => {
           if(device.id == mainAudioDeviceID) {
               mainAudioChannelCount = device.maxOutputChannels;
               mainAudioSampleRate = device.defaultSampleRate;
           }
        });

        let secondaryAudioDeviceID = $('#secondaryAudio option:selected').val();
        let secondaryAudioDeviceName = $('#secondaryAudio option:selected').text();
        let secondaryAudioChannelCount = 0;
        let secondaryAudioSampleRate = 0;

        await voicemeeterDevices.forEach((device) => {
            if(device.id == secondaryAudioDeviceID) {
                secondaryAudioChannelCount = device.maxOutputChannels;
                secondaryAudioSampleRate = device.defaultSampleRate;
            }
        });

        let audioObject = {
            "mainAudioDeviceID": mainAudioDeviceID,
            "mainAudioDeviceName": mainAudioDeviceName,
            "mainAudioChannelCount": mainAudioChannelCount,
            "mainAudioSampleRate": mainAudioSampleRate,
            "secondaryAudioDeviceID": secondaryAudioDeviceID,
            "secondaryAudioDeviceName": secondaryAudioDeviceName,
            "secondaryAudioChannelCount": secondaryAudioChannelCount,
            "secondaryAudioSampleRate": secondaryAudioSampleRate
        };

        ipcRenderer.send('setAudioDevices', audioObject);

    });

    // Event handlers
    ipcRenderer.on('configUpdate', (event,args) => {

        if(args == 'ok') {
            alertify.notify("Configuración actualizada correctamente", 'success', "3");
        } else {
            alertify.notify("Error actualizando la configuración", 'error', "3");
        }

    });
    ipcRenderer.on('getConfig', (event, args) => {

        if(args == null || (args.mainAudioDeviceID === 'Not defined' || args.mainAudioDeviceName === 'Not defined' || args.secondaryAudioDeviceID === 'Not defined' || args.secondaryAudioDeviceName === 'Not defined')) {
            console.log("Couldn't find correct config. Setting to default.");
        } else {
            console.log("Config file found, setting to correct values.");
            $('#mainAudio').val(args.mainAudioDeviceID);
            $('#secondaryAudio').val(args.secondaryAudioDeviceID);
        }

    });
    ipcRenderer.on('receiveAudioVMDevices', (event, args) => {

        voicemeeterDevices = args;
        args.forEach((device) => {

            $('#secondaryAudio').append('<option value="'+device.id+'">'+device.name+'</option>')

        })

    });
    ipcRenderer.on('receiveAudioDevices', (event, args) => {

        devices = args;
        args.forEach((device) => {

            $('#mainAudio').append('<option value="'+device.id+'">'+device.name+'</option>')

        })

    });

});
