const {ipcRenderer, remote} = require('electron');

$(document).ready(function () {
    $(document).on("keydown", function(e) {
        e = e || window.event;
        if (e.ctrlKey) {
            var c = e.which || e.keyCode;
            if (c == 82 || c == 87 || c == 77) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
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

    $('#settings').click(function() {

        if(!window.location.href.includes('settings.html')){
            ipcRenderer.send('moveToSettings');
        }

    });

    $('#macros').click(function() {

        if(!window.location.href.includes('macros.html')){
            ipcRenderer.send('moveToMacros');
        }

    });

    $('#quit').click(function() {
        let activeWindow = remote.BrowserWindow.getFocusedWindow();
        activeWindow.close();
    });

});