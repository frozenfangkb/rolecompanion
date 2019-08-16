$(document).ready(() => {

    let capturingKey = false;
    let keyHolder = {};
    let keyToSave = {};

    ////// Filling the sound list if possible
    /*ipcRenderer.send('loadSoundList', (event,args) => {
        if(args != 500){

        }
    });*/

    ipcRenderer.on('savingNewSound', (event,args) => {
        if(args == 200) {
            alertify.notify("Nuevo sonido capturado correctamente", "success", "5", () => {
                location.reload();
            });
        } else {
            alertify.notify("Error guardando el sonido en la configuración", "error", "5");
        }
    });

    $('#saveSound').click(() => {

        if(capturingKey || (Object.entries(keyHolder).length === 0 && keyHolder.constructor === Object)) {
            alertify.notify("Apaga la captura de atajo de teclado o captura un atajo de teclado por favor", "warning","5");
        } else {
            if(keyHolder.key.toUpperCase() === $('#keyShortcut').val()) { // Making sure that the captured key is correct

                keyToSave = {
                    shiftKey: keyHolder.shiftKey,
                    altKey: keyHolder.altKey,
                    ctrlKey: keyHolder.ctrlKey,
                    metaKey: false,
                    keycode: 0,
                    rawcode: keyHolder.keyCode
                };

                let soundToSave = $('#selectSound option:selected').val();

                ipcRenderer.send('saveNewSound', [soundToSave,keyToSave]);

            } else {
                alertify.notify("Error capturando el atajo de teclado", "error", "5");
            }
        }

    });

    $('#addSound').click(() => {

        $('#addSoundModal').modal('show');

        ipcRenderer.send('getSounds');
        ipcRenderer.on('receiveSoundsList', (event,args) => {

            if(args != 500) {
                args.forEach((file) => {
                    $('#selectSound').append('<option value="'+file+'">'+file+'</option>')
                });
            } else {
                alertify.notify("Ha ocurrido un error cargando los sonidos existentes", "error", "5");
            }


        });

        // ToDo: add button to preview sound

    });

    $('#shortcutButton').click(() => {

        if(!capturingKey) {
            $('#shortcutButton').css('color', 'red');
            $('#keyShortcut').css('border-color', 'red').css('color','red');
            capturingKey = true;

            $(document).keyup((e) => {

                if(e.key == 'Control' || e.key == 'Alt' || e.key == 'Shift') {
                    // Do nothing
                } else {
                    $('#ctrlOption').removeClass('btn-success');
                    $('#shiftOption').removeClass('btn-success');
                    $('#altOption').removeClass('btn-success');

                    $('#ctrlOption').addClass('btn-secondary');
                    $('#shiftOption').addClass('btn-secondary');
                    $('#altOption').addClass('btn-secondary');

                    if(e.ctrlKey) {
                        $('#ctrlOption').removeClass('btn-secondary');
                        $('#ctrlOption').addClass('btn-success');
                    }
                    if(e.altKey) {
                        $('#altOption').removeClass('btn-secondary');
                        $('#altOption').addClass('btn-success');
                    }
                    if(e.shiftKey) {
                        $('#shiftOption').removeClass('btn-secondary');
                        $('#shiftOption').addClass('btn-success');
                    }
                    $('#keyShortcut').val(e.key.toUpperCase());
                    keyHolder = e;
                    // ToDo: send event to backend and start keyboard hooking and play sound

                }


            });

        } else {
            $('#shortcutButton').css('color', '');
            $('#keyShortcut').css('border-color', '').css('color','');
            capturingKey = false;

            $(document).unbind('keyup');

        }

    });

});