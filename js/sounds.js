$(document).ready(() => {

    let capturingKey = false;
    let keyHolder = {};
    let keyToSave = {};

    ipcRenderer.on('savingNewSound', (event,args) => {
        if(args == 200) {
            alertify.notify("Nuevo sonido capturado correctamente", "success", "3", () => {
                location.reload();
            });
        } else {
            alertify.notify("Error guardando el sonido en la configuración", "error", "3");
        }
    });

    ////// Filling the sound list if possible
    ipcRenderer.send('loadSoundList');

    ipcRenderer.on('setSoundList', async (event,args) => {
        if(args != 204){

            $('#soundList').empty().
            append(
                "<div id='titleSounds' class='row' style='border-bottom: solid 2px;width: 100%'></div>"
            );

            $('#titleSounds').
            append(
                "<div class='col-sm-2 offset-sm-1'>Sonido</div>"
            ).
            append(
                "<div class='col-sm-2 offset-sm-2'>Atajo</div>"
            ).
            append(
                "<div class='col-sm-2 offset-sm-2'>Acciones</div></div></div>"
            );

            $('#soundList').append("<div id='listForSounds' class='row' style='width: 100%;text-align: center; margin-top: 10px; padding-top: 10px;background-color: #313443'></div>");

            let shortcutString = "";

            await args.forEach((sound) => {

              shortcutString = "";

              if(sound.shortcut.ctrlKey) shortcutString+="Ctrl+";
              if(sound.shortcut.shiftKey) shortcutString+="Shift+";
              if(sound.shortcut.altKey) shortcutString+="Alt+";

              shortcutString+=String.fromCharCode(sound.shortcut.rawcode)

              $('#listForSounds').append("<div class='soundItemName col-sm-2 offset-sm-1'>"+sound.sound.slice(0,-4)+"</div>").
              append("<div class='soundItemShortcut offset-sm-2 col-sm-2'>"+shortcutString+"</div>").
              append("<div class='soundItemActions offset-sm-2 col-sm-2'><i class='material-icons' onclick='editItem(this)' id='"+sound.sound+"'>edit</i>  <i class='material-icons' onclick='deleteItem(this)' id='"+sound.sound+"'>delete_forever</i></div>");

            })

        } else {
            $('#soundList').empty().append("Todavía no has añadido ningún sonido.");
        }
    });

    $('#saveSound').click(() => {

        if(capturingKey || (Object.entries(keyHolder).length === 0 && keyHolder.constructor === Object)) {
            alertify.notify("Apaga la captura de atajo de teclado o captura un atajo de teclado por favor", "warning","3");
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

                $('.modal-footer').toggle(500);
                ipcRenderer.send('saveNewSound', [soundToSave,keyToSave]);

            } else {
                alertify.notify("Error capturando el atajo de teclado", "error", "3");
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
                alertify.notify("Ha ocurrido un error cargando los sonidos existentes", "error", "3");
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

// Auxiliar function to deleting sounds item from list and config
function deleteItem(item) {
    console.log(item.id)
}

// Auxiliar function to editing sounds
function editItem(item) {
    console.log(item.id)
}
