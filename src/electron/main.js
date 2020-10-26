const {app, BrowserWindow, ipcMain, dialog } = require('electron');
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
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    minHeight: 800,
    minWidth: 900,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  mainWindow.loadURL(isDev?"http://localhost:8080":__dirname+"/../react/dist/index.html")
}


var exe_path =  __dirname + "/../python-backend/dist/agregador_server.exe"
child.exec(exe_path, function(err, data) {
    if(err){
       console.error(err);
       return;
    }
    console.log(data.toString());
});

//TODO: esperar de forna sincrona
ipcMain.on("getDirPath", (event,arg)=>{
  dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result=>{
    console.log(result.filePaths[0].toString())
    var path = result.filePaths[0].toString()
    var confirm = grpc_client.SendDataPath(path)
    event.reply('dirPathResult',result )
  })
})

ipcMain.on("sendInfoFTP", (event, arg)=>{
  var confirm = grpc_client.SendParamsFTP(arg)
  event.reply('sendInfoFTP_Result', confirm )
})

ipcMain.on("makeAggregation", (event, arg)=>{

  grpc_client.client.MakeAggregation(arg, (err, response)=> {
    console.log('MakeAggregation_cli:', response);
    console.log("Erro: " + err)
    event.reply('makeAggregation_Result', response )

  });

})
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
