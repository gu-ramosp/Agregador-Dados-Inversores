import React, {Component} from 'react';
import './startPage.css'
const { ipcRenderer } = window.require("electron");
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';


class StartPage extends Component{

    nextPage = (e) => {
        console.log("avançando página para página de menu")
    }

    mandaInfoFTP = (e) =>{
        console.log("mandando FPT info")
        ipcRenderer.send("help", "argumentos python")
        
    }

    mandFilesPath = (e) =>{
        console.log("mandando file path")
    }

    render(){
        return(
            <div className="body">
                <AppBar id="header">
                    <h2>Escolha o lugar de onde deseja-se obter os dados para agregação</h2>
                </AppBar>
                <div  id="option-ftp">
                    <h2>MENU 1</h2>
                    <button onClick={this.mandaInfoFTP}>
                        Arquivo local
                    </button>
                </div>
                <div id="option-file">
                    <h2 >MENU 2</h2>
                    <button onClick={this.mandaInfoFTP}>
                        FTP
                    </button>
                </div>
                <footer id="progress-btn">
                    <Link to="/menu">
                        <Button variant="contained"   color="primary">
                            Avançar para agregações
                        </Button>
                    </Link>
                    <h2>OU</h2>
                    <Link to="/graficos">
                        <Button variant="contained"  id="graficos-btn" color="primary">
                            Gráficos
                        </Button>
                    </Link>
                </footer>
            </div>
        ) 
    }
}


ipcRenderer.on("help2", (event, arg) => {
    console.log(arg)
})

export default StartPage
