import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import './agregadorResultados.css'
import BasicTable from './tabela';

class AgregadorResultados extends Component{

    render(){
        return(
            <div>
                <BasicTable></BasicTable>
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