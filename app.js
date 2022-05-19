const { app, BrowserWindow } = require('electron');
const { loadMethods } = require('./methods');
const dirs = require('./dirs');
const path = require('path');
const appdata = require('appdata-path');
const log = require('electron-log').transports.file.resolvePath = () => path.join( appdata('sbms'), 'sbms-log.log');

/*
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
  provider: "github",
  repo: "realese",
  owner: "jesusrogliero",
  token: "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"
});

*/

// funcion de inicio de la aplicacion
const main = function () {

  /*
  // Setup updater events
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    console.log('Update available');
  });

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available')
  });

  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater. ' + err);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded');
  });

  autoUpdater.checkForUpdatesAndNotify();
  */
  
  // cargando ventana
  const win = new BrowserWindow({
    show:false,
    minWidth: 1110,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.maximize();
  win.setMenuBarVisibility(false)
  win.loadFile(dirs.public + 'index.html');


  // cargando el listado de archivos
  const fs = require('fs');
  fs.readdir(dirs.methods, (error, files) => {
    if (!error) loadMethods(files);
    else console.error(error);
  });

  win.once('ready-to-show', () => {
    win.show();
  });

};

app.whenReady().then(() => main());

