$(document).ready(() => {

    $('#addSound').click(() => {

        $('#addSoundModal').modal('show');

        ipcRenderer.send('getSounds');
        ipcRenderer.on('receiveSoundsList', (event,args) => {

            args.forEach((file) => {
                $('#selectSound').append('<option value="'+file+'">'+file+'</option>')
            });

        });

    });

});