const path = require('path');
//import pkg from 'electron';
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    // frame: false,
    width: 1200,
    maxWidth: 1200,
    minHeight: 400,
    minWidth: 1200,
    backgroundColor: 'skyblue',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.removeMenu();

  // and load the index.html of the app.
  // win.loadFile("index.html");
  if (isDev) {
    console.log('entering dev...');
    win.loadURL('http://localhost:3000');
  } else {
    win.loadURL('https://pushparajshop.herokuapp.com');
  }

  // Open the DevTools.
  //if (isDev) {
  win.webContents.openDevTools({ mode: 'detach' });
  //}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
