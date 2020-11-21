const {app, BrowserWindow, ipcMain, dialog } = require('electron');
const {stdout, stderr } = require('process');
const  path = require('path');
const  grpc_client = require('./grpc-client')
const  isDev = require("electron-is-dev")
const  child = require('child_process');

//TODO: Refatorar funções do IPC que usam o cliente GRPC para chamar funções direto
//TODO: Substituir child.exec por child_spawn para o servidor em python fechar junto com a janela

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-line global-require
if (require('electron-squirrel-startup')) { app.quit();}


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    minHeight: 800,
    minWidth: 900,
    webPreferences: {nodeIntegration: true}
  })
  mainWindow.loadURL(isDev?"http://localhost:8080":__dirname+"/../react/dist/index.html")
}

console.log(__dirname)
var exe_path = isDev?`${__dirname}/../python-backend/dist/agregador_server.exe`:`${__dirname}/../python-backend/dist/agregador_server.exe`
console.log(exe_path)


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
  // var confirm = grpc_client.SendParamsFTP(arg)
  // event.reply('sendInfoFTP_Result', confirm )
  grpc_client.client.SendParamsFTP(arg, (err, response)=> {
    console.log('sendInfoFTP_cli:', response);
    console.log("Erro: " + err)
    event.reply('sendInfoFTP_Result', response )
  });
})


ipcMain.on("makeAggregation", (event, arg)=>{
  grpc_client.client.MakeAggregation(arg, (err, response)=> {
    console.log('MakeAggregation_cli:', response);
    console.log("Erro: " + err)
    event.reply('makeAggregation_Result', response )
  });
})


app.on('ready', createWindow);


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
