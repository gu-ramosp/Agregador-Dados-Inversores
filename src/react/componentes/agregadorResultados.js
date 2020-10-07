import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import './agregadorResultados.css'
import TableMenu from './tabelaMenu';

class AgregadorResultados extends Component{

    render(){
        return(
            <div>
                <TableMenu></TableMenu>
                <Link to="/">
                    <button>
                        voltar inicio
                    </button>
                </Link>
            </div>
        ) 
    }

    
}

export default AgregadorResultados