import ReactDOM from 'react-dom'
import React, {Component} from 'react';
import {HashRouter ,Switch, Route} from 'react-router-dom'
import StartPage from './componentes/startPage'
import AgregadorMenu from './componentes/agregadorMenu'
import AgregadorResultados from './componentes/agregadorResultados'
import GraficosPage from './componentes/graficosPage'

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
}



ReactDOM.render(<App/>,document.getElementById("app"))