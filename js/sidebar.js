$(document).ready(function() {

    const {remote} = require('electron');

    $('.fa-sign-out').click(function() {
        let activeWindow = remote.BrowserWindow.getFocusedWindow();
        activeWindow.close();
    });

});