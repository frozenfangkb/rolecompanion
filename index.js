const {app, BrowserWindow, ipcMain} = require('electron');

// Global reference to window
let win;
let child = null;

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });

    win.loadFile('index.html').then(r => console.log("Correctly loaded index page."));

    win.on('closed', () => {
        win = null
    });

    //win.removeMenu();

    //win.webContents.openDevTools();

}

function createChild(file) {
    child = new BrowserWindow({parent: win, modal: true, show: false,
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false});
    child.loadFile(file);
    child.on('closed', () => {
        child = null
    });
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
        createWindow();
    }
});

ipcMain.on('moveToHelp', function(event,arg) {
    if (child === null) {
        createChild('help.html');
    }
    child.show();
    child.on('show', () => {
        win.hide();
    })
});

//////// Navigation ipc events

ipcMain.on('moveToSounds', function(event,arg) {
    win.loadFile('sounds.html');
});

ipcMain.on('moveToHome', function(event,arg) {
    win.loadFile('index.html');
});

ipcMain.on('moveToSettings', function(event,arg) {
    win.loadFile('settings.html');
});

ipcMain.on('moveToMacros', function(event,arg) {
    win.loadFile('macros.html');
});

ipcMain.on('childClosed', function(event,arg) {
    win.show();
});