import React, {Component} from 'react';
import './startPage.css'
const { ipcRenderer } = window.require("electron");
import {Link} from 'react-router-dom'

ipcRenderer.on("help2", (event, arg) => {
    console.log(arg)
})

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
                <header id="header">
                    <h1>Escolha o lugar de onde deseja-se obter os dados para agregação</h1>
                </header>
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
                    <h2>VAI</h2>
                    <Link to="/menu">
                        <button onClick={this.nextPage}>
                            Avançar para agregações
                        </button>
                    </Link>
                    <Link to="/graficos">
                        <button>
                            Gráficos
                        </button>
                    </Link>
                </footer>
            </div>
        ) 
    }

    
}

export default StartPage