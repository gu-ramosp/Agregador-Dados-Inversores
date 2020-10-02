import ReactDOM from 'react-dom'
import React, {Component} from 'react';
import {HashRouter ,Switch, Route} from 'react-router-dom'
import StartPage from './componentes/startPage'
import AgregadorMenu from './componentes/agregadorMenu'

class App extends Component{
    
    render(){
        return(
            <HashRouter> 
                <Switch>
                    <Route path="/" exact component={StartPage}/>  
                    <Route path="/menu" component={AgregadorMenu}/>     
                </Switch>
            </HashRouter> 
        ) 
    }
}



ReactDOM.render(<App/>,document.getElementById("app"))