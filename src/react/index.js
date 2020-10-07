import ReactDOM from 'react-dom'
import React, {Component} from 'react';
import {HashRouter ,Switch, Route} from 'react-router-dom'
import StartPage from './componentes/startPage/startPage'
import AgregadorMenu from './componentes/agrrMenuPage/agregadorMenu'
import AgregadorResultados from './componentes/ResultadosPage/agregadorResultados'
import GraficosPage from './componentes/graficosPage/graficosPage'
const { ipcRenderer } = window.require("electron");

class App extends Component{
    
    render(){
        return(
            <HashRouter> 
                <Switch>
                    <Route path="/" exact component={StartPage}/>  
                    <Route path="/menu" component={AgregadorMenu}/>     
                    <Route path="/resultados" component={AgregadorResultados} />
                    <Route path="/graficos" component={GraficosPage} />
                </Switch>
            </HashRouter> 
        ) 
    }

    aggr_results = ipcRenderer.on("makeAggregation_Result", (event, arg) => {
        console.log("o que eu quero")
        console.log(arg)
    })
    
    
}



ReactDOM.render(<App/>,document.getElementById("app"))