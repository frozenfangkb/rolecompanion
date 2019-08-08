const {ipcRenderer} = require('electron');

$(document).ready(() => {

    ipcRenderer.send('getAudioDevices');
    ipcRenderer.on('receiveAudioDevices', (event, arg) => {

        console.log(event);
        console.log(arg);

    });

});