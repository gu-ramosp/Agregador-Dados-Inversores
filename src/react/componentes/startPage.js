import React, {Component} from 'react';
import './startPage.css'
const { ipcRenderer } = window.require("electron");


class StartPage extends Component{

    nextPage = (e) => {
        console.log("avançando página para página de menu")
        ipcRenderer.send("help", "help")
    }

    mandaInfoFTP = (e) =>{
        console.log("mandando FPT info")
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
                    <button onClick={this.fazAlgo}>
                        Arquivo local
                    </button>
                </div>
                <div id="option-file">
                    <h2 >MENU 2</h2>
                    <button onClick={this.fazAlgo}>
                        FTP
                    </button>
                </div>
                <footer id="progress-btn">
                    <h2>VAI</h2>
                    <button onClick={this.nextPage}>
                        Avançar
                    </button>
                </footer>
            </div>
        ) 
    }

    
}

export default StartPage