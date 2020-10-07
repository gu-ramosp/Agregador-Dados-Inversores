import React, {Component,useEffect} from 'react';
import './startPage.css'
const { ipcRenderer } = window.require("electron");
import {Link} from 'react-router-dom'
import { Button, Input } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


class StartPage extends Component{

    state = {
        desabilitado: true,
        btnGraficos:"/",
        btnMenuAggr:"/",
        host: '',
        porta: '21',
        usuario: '',
        senha :'',  
    };

      
    render(){
        const {host,porta,usuario,senha } = this.state
        const values = {host,porta,usuario,senha }
        return(
            <div className="body">
                {/* <TableMenu changeSelection={this.changeSelection} agrr_selections={this.state.agrr_selections}></TableMenu> */}
                {/* <SelectorInput changeSelection={this.fun} aggrType={this.state.agrr_selections.idc}></SelectorInput> */}
                <AppBar id="header">
                    <h2 >Escolha o lugar de onde deseja-se obter os dados para agregação</h2>
                </AppBar>

                <div  id="option-file">
                    <h2 className="header-menu">Pasta Local</h2>
                    <Button  onClick={this.mandaFilesPath} variant="contained"  id="graficos-btn" color="primary">
                        Buscar
                    </Button>
                </div>
                <hr></hr>
                <div id="option-ftp">
                    <h2 className="header-menu">Servidor FTP</h2>
                    <form  noValidate autoComplete="off">
                        <TextField  style={{margin:"0.25em"}} className="inputF" label="Host"  
                            variant="outlined"  onChange={this.handleChange('host')} defaultValue={values.host}/>
                        <TextField  style={{margin:"0.25em"}} className="inputF" label="Porta"
                            variant="outlined"  onChange={this.handleChange('porta')} defaultValue={values.porta} />
                        <TextField style={{margin:"0.25em"}} className="inputF" label="Usuário" 
                            variant="outlined"  onChange={this.handleChange('usuario')} defaultValue={values.usuario} />
                        <TextField style={{margin:"0.25em"}} className="inputF" label="Senha" 
                            variant="outlined"  onChange={this.handleChange('senha')} defaultValue={values.senha}  />
                    </form>
                    <Button  onClick={this.mandaInfoFTP} variant="contained"  id="graficos-btn" color="primary">
                        Confirmar
                    </Button>
                </div>

                <Paper id="progress-btn" elevation={24}>
                    <Link to={this.state.btnMenuAggr}>
                        <Button variant="contained" disabled={this.state.desabilitado}  color="primary">
                            Avançar para agregações
                        </Button>
                    </Link>
                    <h2>OU</h2>
                    <Link to={this.state.btnGraficos}>
                        <Button variant="contained" to="/graficos"  disabled={this.state.desabilitado}  id="graficos-btn" color="primary">
                            Gráficos 
                        </Button>
                    </Link>
                </Paper>
            </div>
        ) 
    }

    handleChange = input => e => {this.setState({[input]: e.target.value})}

    mandaInfoFTP = (e) =>{
        const {host,porta,usuario,senha } = this.state
        const values = {host,porta,usuario,senha }

        ipcRenderer.send("sendInfoFTP", values)
        console.log("mandando FPT info")        
        this.state.btnGraficos = "/graficos"
        this.state.btnMenuAggr = "/menu"
        console.log(this.state)
    }

    mandaFilesPath = (e) =>{
        ipcRenderer.send("getDirPath", "vazio")
        console.log("mandando file path")
        this.state.btnGraficos = "/graficos"
        this.state.btnMenuAggr = "/menu"
        console.log(this.state)
    }

   dirPath_Res =  ipcRenderer.on("dirPathResult", (event, arg) => {
        console.log("Resultado do python dataPAth")
        console.log(arg)
        this.setState({desabilitado: false})
    })

    sendInfoFTP_Res =  ipcRenderer.on("sendInfoFTP_Result", (event, arg) => {
        console.log("sendInfoFTP_Result")
        this.setState({desabilitado: false})
    })

}

export default StartPage
