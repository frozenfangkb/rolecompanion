$(document).ready(() => {

    let capturingKey = false;

    $('#addSound').click(() => {

        $('#addSoundModal').modal('show');

        ipcRenderer.send('getSounds');
        ipcRenderer.on('receiveSoundsList', (event,args) => {

            args.forEach((file) => {
                $('#selectSound').append('<option value="'+file+'">'+file+'</option>')
            });

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