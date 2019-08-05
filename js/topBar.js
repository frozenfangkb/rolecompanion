$(document).ready(function() {

    const {remote} = require('electron');

    $('#min-btn').click(function() {
        let activeWindow = remote.BrowserWindow.getFocusedWindow();
        activeWindow.minimize();
    });

    $('#close-btn').click(function() {
        let activeWindow = remote.BrowserWindow.getFocusedWindow();
        activeWindow.close();
    });

});