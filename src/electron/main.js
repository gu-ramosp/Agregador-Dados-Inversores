const {app, BrowserWindow, ipcMain } = require('electron');
const {stdout, stderr } = require('process');
const  path = require('path');
const  grpc_client = require('./grpc-client')
const  isDev = require("electron-is-dev")
const  child = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-line global-require
if (require('electron-squirrel-startup')) { 
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  var exe_path = __dirname + "/../python-backend/dist/agregador_server.exe"
  child.execFile(exe_path, function(err, data) {
      if(err){
         console.error(err);
         return;
      }
      console.log(data.toString());
  });
  

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.loadURL(
    isDev?"http://localhost:8080":__dirname+"/../react/dist/index.html")

  ipcMain.on("help", (event,arg)=>{
    var algo = grpc_client.main(arg)
    console.log(algo)
    event.reply('help2',algo )
  })
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
