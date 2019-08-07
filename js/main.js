const {ipcRenderer, remote} = require('electron');

$(document).ready(function () {
    $('ul li').on('click', function() {
        $('li').removeClass('active');
        $(this).addClass('active');
    });

    if($('#help-icon').length > 0) {
        $('#help-icon').click(function() {
            console.log("recibido 1")
            ipcRenderer.send('moveToHelp');
        });
    }
    
    $('#sounds').click(function() {

        if(!window.location.href.includes('sounds.html')){
            ipcRenderer.send('moveToSounds');
        }

    });

    $('#home').click(function() {

        if(!window.location.href.includes('index.html')){
            ipcRenderer.send('moveToHome');
        }

    });

});