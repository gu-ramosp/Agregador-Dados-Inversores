import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import './agregadorResultados.css'

class AgregadorResultados extends Component{

    render(){
        return(
            <div>
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