const {ipcRenderer, remote} = require('electron');

$(document).ready(function () {
    $('ul li').on('click', function() {
        $('li').removeClass('active');
        $(this).addClass('active');
    });

    $('#help-icon').click(function() {
        console.log("recibido 1")
        ipcRenderer.send('moveToHelp', 'done');
    });

});