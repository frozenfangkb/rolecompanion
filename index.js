const { app, BrowserWindow, ipcMain } = require('electron');
// const iohook = require('iohook');
// const keycode = require('keycode');
const naudiodon = require('naudiodon');
const fs = require('fs');

// ToDo: Add logger module and configure it across the file
// Global reference to window and child windows
let win;
let child = null;

// Global reference to config variables
let defaultConfig = {
  "mainAudioDeviceID": "Not defined",
  "secondaryAudioDeviceID": "Not defined"
};
let config = null;
const configFilePath = './config.json';

/// ///// Config file loading
fs.access(configFilePath, fs.F_OK, (err) => {
  if (err) { // File doesn't exist yet, need to initialize it
    fs.writeFile(configFilePath, JSON.stringify(defaultConfig), () => {
      console.log("New config file created successfully")
    }); // ToDo: Add action to log file
  } else {
    let rawData = fs.readFileSync(configFilePath, () => {
      console.log("Config file readed successfully");
    }); // ToDo: Add action to log file
    config = JSON.parse(rawData);
  }
});

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

  //win.webContents.openDevTools()
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
    if (device.maxInputChannels === 0 || device.name.includes("VoiceMeeter")) {
      finalDevices.push(device)
    }
  });
  event.reply('receiveAudioDevices', finalDevices)
});

ipcMain.on('getAudioVMDevices', (event, args) => {
  const devices = naudiodon.getDevices();
  let finalDevices = [];
  devices.forEach((device) => {
    if (device.name.includes("VoiceMeeter")) {
      finalDevices.push(device)
    }
  });
  event.reply('receiveAudioVMDevices', finalDevices)
});

/// ///// Audio devices loading events END
