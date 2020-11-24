const {app, BrowserWindow, ipcMain, dialog } = require('electron');
const {stdout, stderr } = require('process');
const  path = require('path');
const  grpc_client = require('./grpc-client')
const  isDev = require("electron-is-dev")
const  child = require('child_process');

//TODO: Refatorar funções do IPC que usam o cliente GRPC para chamar funções direto
//TODO: Substituir child.exec por child_spawn para o servidor em python fechar junto com a janela (feito,porém ainda fecha separado)

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


var exe_path = isDev?`${__dirname}/../python-backend/dist/agregador_server.exe`:`${__dirname}/../python-backend/dist/agregador_server.exe`
child.spawn(exe_path, [], { shell: true })


ipcMain.on("getDirPath", (event,arg)=>{
  dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result=>{
    console.log(result.filePaths[0].toString())
    var path = result.filePaths[0].toString()
    grpc_client.client.SendDataPath(path)
    event.reply('SendDataPat_Result',result )
  })
})


ipcMain.on("sendInfoFTP", (event, arg)=>{
  grpc_client.client.SendParamsFTP(arg, (err, response)=> {
    console.log('sendInfoFTP_cli:', response);
    console.log("Erro: " + err)
    event.reply('SendInfoFTP_Result', response )
  });
})


ipcMain.on("makeAggregation", (event, arg)=>{
  grpc_client.client.MakeAggregation(arg, (err, response)=> {
    console.log('MakeAggregation_respone:', response);
    // Raramente ocorre o erro:
    // 2 UNKNOWN: Exception calling application: [Errno 22] Invalid argument
    // O motivo? Só deus sabe
    if(err){
      console.log("Erro: " + err)
      response = {
        erro: true
      }
    }
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
