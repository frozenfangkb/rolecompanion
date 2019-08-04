const {app, BrowserWindow, Menu} = require('electron');
//const iohook = require('iohook');
//const keycode = require('keycode');
//const naudiodon = require('naudiodon');

// Global reference to window
let win;

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html').then(r => console.log("Correctly loaded index page."));

    win.on('closed', () => {
        win = null
    });

    //win.removeMenu();

}

// ToDo: Implement menu modifications

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