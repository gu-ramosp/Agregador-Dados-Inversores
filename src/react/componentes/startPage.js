import React, {Component} from 'react';
import './startPage.css'
const { ipcRenderer } = window.require("electron");
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


class StartPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            desabilitado: true,
            btnGraficos:"/",
            btnMenuAggr:"/"
        };
      }

    render(){
        return(
            <div className="body">

                <AppBar id="header">
                    <h2 className="header-menu">Escolha o lugar de onde deseja-se obter os dados para agregação</h2>
                </AppBar>

                <div  id="option-file">
                    <h2 className="header-menu">Pasta Local</h2>
                    <Button  onClick={this.mandaFilesPath} variant="contained"  id="graficos-btn" color="primary">
                        Buscar
                    </Button>
                </div>
                <hr></hr>
                <div id="option-ftp">
                    <h2 >Servidor FPT</h2>
                    <button onClick={this.mandaInfoFTP}>
                        Confirmar
                    </button>
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

    mandaInfoFTP = (e) =>{
        console.log("mandando FPT info")        
        this.state.btnGraficos = "/graficos"
        this.state.btnMenuAggr = "/menu"
        this.state.desabilitado = false
        console.log(this.state)

    }

    mandaFilesPath = (e) =>{
        ipcRenderer.send("getDirPath", "vazio")
        console.log("mandando file path")
        this.state.btnGraficos = "/graficos"
        this.state.btnMenuAggr = "/menu"
        this.state.desabilitado = false
        console.log(this.state)

    }
}


ipcRenderer.on("dirPathResult", (event, arg) => {
    console.log("Resultado do python dataPAth")
    console.log(arg)
})

export default StartPage
