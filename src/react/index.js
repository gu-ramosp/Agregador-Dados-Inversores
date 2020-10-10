import ReactDOM from 'react-dom'
import React, {Component} from 'react';
import {HashRouter ,Switch, Route} from 'react-router-dom'
import StartPage from './componentes/startPage/startPage'
import AgregadorMenu from './componentes/agrrMenuPage/agregadorMenu'
import AgregadorResultados from './componentes/ResultadosPage/agregadorResultados'
import GraficosPage from './componentes/graficosPage/graficosPage'
const { ipcRenderer } = window.require("electron");

class App extends Component{
    
    state={
        teste: 'Fata Morgana'
    }

    render(){
        return(
            <HashRouter> 
                <Switch>
                    <Route path="/" exact component={StartPage}/>  
                    <Route path="/menu" component={AgregadorMenu}/>     
                    <Route path="/resultados" teste={"dsjflkjfd"} component={AgregadorResultados} />
                    <Route path="/graficos" component={GraficosPage} />
                </Switch>
            </HashRouter> 
        ) 
    }

  
    
}



ReactDOM.render(<App/>,document.getElementById("app"))