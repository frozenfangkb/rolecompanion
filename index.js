const {app, BrowserWindow, ipcMain} = require('electron');
//const iohook = require('iohook');
//const keycode = require('keycode');
//const naudiodon = require('naudiodon');

// Global reference to window
let win;
let help = null;

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

function createHelpChild() {
    help = new BrowserWindow({parent: win, modal: true, show: false,
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false});
    help.loadFile('help.html');
    help.on('closed', () => {
        help = null
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
    if (help === null) {
        createHelpChild();
    }
    help.show();
});
