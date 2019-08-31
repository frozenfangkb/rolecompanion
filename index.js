const { app, BrowserWindow, ipcMain } = require('electron');
const iohook = require('iohook');
const keycode = require('keycode');
const naudiodon = require('naudiodon');
const fs = require('fs');
const path = require('path');

// ToDo: Add logger module and configure it across the file
// Global reference to window and child windows
let win;
let child = null;

// Global reference to config variables
let defaultConfig = {
  mainAudioDeviceID: "Not defined",
  mainAudioDeviceName: "Not defined",
  secondaryAudioDeviceID: "Not defined",
  secondaryAudioDeviceName: "Not defined",
  sounds: []
};
let config = null;
const configFilePath = './config.json';

/// ///// Config file loading
fs.access(configFilePath, fs.F_OK, (err) => {
  if (err) { // File doesn't exist yet, need to initialize it
    fs.writeFile(configFilePath, JSON.stringify(defaultConfig), () => {
      console.log("New config file created successfully")
    }); // ToDo: Add action to log file
    config = defaultConfig;
  } else {
    let rawData = fs.readFileSync(configFilePath, () => {
      console.log("Config file readed successfully");
    }); // ToDo: Add action to log file
    config = JSON.parse(rawData);
  }
});

ipcMain.on('loadConfig', (event,args) => {

  event.reply('getConfig', config);

});

function updateConfig() {

  fs.writeFile(configFilePath, JSON.stringify(config), () => {
    console.log("Config file updated successfully")
  }); // ToDo: Add action to log file

}

/// ///// Config file loading


function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });

  win.loadFile('index.html').then(r => console.log('Correctly loaded index page.'));

  win.on('closed', () => {
    win = null
  })

  // win.removeMenu();

  win.webContents.openDevTools()
}

function createChild (file) {
  child = new BrowserWindow({
    parent: win,
    modal: true,
    show: false,
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false });
  child.loadFile(file);
  child.on('closed', () => {
    child = null
  })
}

// ToDo: Implement menu modifications¿?

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

/// ///// Navigation ipc events

ipcMain.on('moveToSounds', function (event, arg) {
  win.loadFile('sounds.html')
});

ipcMain.on('moveToHelp', function (event, arg) {
  if (child === null) {
    createChild('help.html')
  }
  child.show();
  child.on('show', () => {
    win.hide()
  })
});

ipcMain.on('moveToHome', function (event, arg) {
  win.loadFile('index.html')
});

ipcMain.on('moveToSettings', function (event, arg) {
  win.loadFile('settings.html')
});

ipcMain.on('moveToMacros', function (event, arg) {
  win.loadFile('macros.html')
});

ipcMain.on('childClosed', function (event, arg) {
  win.show()
});

/// ///// Navigation ipc events END

/// ///// Audio devices loading events

ipcMain.on('getAudioDevices', (event, args) => {
  const devices = naudiodon.getDevices();
  let finalDevices = [];
  devices.forEach((device) => {
    if (device.maxInputChannels === 0 && device.name.substring(device.name.length-1) === ')') {
      finalDevices.push(device)
    }
  });
  event.reply('receiveAudioDevices', finalDevices)
});

ipcMain.on('getAudioVMDevices', (event, args) => {
  const devices = naudiodon.getDevices();
  let finalDevices = [];
  devices.forEach((device) => {
    if (device.name.includes("VoiceMeeter") && device.name.substring(device.name.length-1) === ')') {
      finalDevices.push(device)
    }
  });
  event.reply('receiveAudioVMDevices', finalDevices)
});

ipcMain.on('setAudioDevices', (event, args) => {

  try{

    let audioObject = args;

    config.mainAudioDeviceID = audioObject.mainAudioDeviceID;
    config.mainAudioDeviceName = audioObject.mainAudioDeviceName;
    config.secondaryAudioDeviceID = audioObject.secondaryAudioDeviceID;
    config.secondaryAudioDeviceName = audioObject.secondaryAudioDeviceName;

    updateConfig();

    event.reply('configUpdate', 'ok');

  } catch(e) {
    console.log(e); // ToDo: log error on file
    event.reply('configUpdate', 'error');
  }

});

/// ///// Audio devices loading events END

// Auxiliar function for capitalize the first letter of a string
// Got it from https://dzone.com/articles/how-to-capitalize-the-first-letter-of-a-string-in
function jsUcfirst(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//////// Sounds events

ipcMain.on('getSounds',(event,args) => {

  let sounds = [];
  let directoryPath = path.join(__dirname, 'sounds');

  fs.readdir(directoryPath, function (err, files) {

    if (err) {
      event.reply('receiveSoundsList', 500);
      return console.log('Unable to scan directory: ' + err); // ToDo: log error on file
    } else {
      files.forEach((file) => { sounds.push(jsUcfirst(file.slice(0,-4))) });
      event.reply('receiveSoundsList', sounds);
    }

  });

});

ipcMain.on('saveNewSound', (event,args) => {

  let directoryPath = path.join(__dirname, 'sounds');

  fs.readdir(directoryPath, function (err, files) {

    if (err) {
      event.reply('savingNewSound', 500);
      return console.log('Unable to scan directory: ' + err); // ToDo: log error on file
    } else {
      files.forEach((file) => {
        if(file.toUpperCase().slice(0,-4) === args[0].toUpperCase()) {

          config.sounds.push({
            sound: file,
            shortcut: args[1]
          });

          try {
            updateConfig();
            event.reply('savingNewSound', 200);
          } catch(e) {
            event.reply('savingNewSound', 500); // ToDo: log error on file
          }

        }
      });
    }

  });

});

ipcMain.on('loadSoundList', async (event,args) => {

  let soundList = [];
  if(config.sounds.length <= 0) {
    event.reply('setSoundList', 204);
  } else {
    await config.sounds.forEach((sound) => {
      soundList.push(sound);
    });
    event.reply('setSoundList', soundList);
  }

});

ipcMain.on('deleteSound', async (event,args) => {

  try {
    for(let i = 0; i < config.sounds.length; i++) {
      if(config.sounds[i].sound == args) {
        config.sounds.splice(i,1);
      }
    }
    updateConfig();
    event.reply('soundDeleted', 200);
  } catch(err) {
    console.log(err); // ToDo: Log error in log file
    event.reply('soundDeleted', 500);
  }

});

//////// Sounds events END
