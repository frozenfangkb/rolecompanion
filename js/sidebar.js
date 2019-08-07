$(document).ready(function() {

    const {remote, ipcRenderer} = require('electron');

    $('.fa-sign-out').click(function() {
        let activeWindow = remote.BrowserWindow.getFocusedWindow();
        ipcRenderer.send('childClosed');
        activeWindow.close();
    });

});