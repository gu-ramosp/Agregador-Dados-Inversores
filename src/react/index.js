import ReactDOM from 'react-dom'
import React, {Component} from 'react';
import StartPage from './componentes/startPage'
import {HashRouter as Router, Route} from 'react-router-dom'
// import  App from "./App";


class App extends Component{
    
    render(){
        return(
            <Router>               
                 <StartPage></StartPage>
            </Router> 
        ) 
    }
}



ReactDOM.render(<App/>,document.getElementById("app"))