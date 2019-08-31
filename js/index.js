$(document).ready(() => {

  // Checking if RC is configured
  ipcRenderer.on('configChecked', (event,args) => {

    switch(args) {

      case 200:
        $('#startHooks').attr('disabled',false);
        $('#mainInfo').empty();
        $('#mainInfo').append('Configuración correcta. ¡Disfruta de RoleCompanion! =)<br><br>Estado actual de RoleCompanion: <i class="material-icons" id="RCStatus" style="vertical-align: middle; margin-left: 10px;">record_voice_over</i>');
      break;
      case 400:
        $('#startHooks').attr('disabled',true);
        $('#mainInfo').empty();
        $('#mainInfo').append('Uh oh, los dispositivos de sonido parecen mal configurados =(');
      break;
      case 406:
      $('#startHooks').attr('disabled',true);
      $('#mainInfo').empty();
      $('#mainInfo').append('Para poder usar RoleCompanion, tienes que configurar antes algún sonido en la sección de sonidos.');
      break;
      default:
      $('#mainInfo').empty();
      $('#mainInfo').append('Houston, tenemos un problema. Algo ha ido raruno, por favor, reporta el bug en http://wolfblackmoon.zapto.org:8000');
      break;

    }

  });

  ipcRenderer.send('checkConfig');

  $('#startHooks').click(() => {

    $('#startHooks').attr('disabled', true);
    $('#stopHooks').attr('disabled', false);

    ipcRenderer.send('initHooks');

  });

  $('#stopHooks').click(() => {

    $('#startHooks').attr('disabled', false);
    $('#stopHooks').attr('disabled', true);

    ipcRenderer.send('stopHooks');

  });

  // Events handlers
  ipcRenderer.on('stoppedHooks', (event,args) => {
    if(args === 200) {
      alertify.success("RoleCompanion detenido correctamente", "3");
      $('#RCStatus').css('color','red');
    } else {
      alertify.error("Error al detener RoleCompanion", "3");
    }
  });

  ipcRenderer.on('hooksStarted', (event,args) => {

    if(args == 200) {
      alertify.notify("RoleCompanion listo y escuchando", "success", "3");
      $('#RCStatus').css('color','green');
    } else {
      alertify.notify("Error al inicializar RoleCompanion", "error", "3");
    }

  });
});
