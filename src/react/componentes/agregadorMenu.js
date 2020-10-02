import React, {Component} from 'react';
import './agregadorMenu.css'
import {Link} from 'react-router-dom'

class AgregadorMenu extends Component{

    render(){
        return(
            <div className="other-body">
               <div className="tech-type-menu">tech-type-menu</div>
               <div className="data-selector"> data-selector </div>
               <div className="var-options"> var-options </div>
               <div className="agrr-options"> aggr-options </div>
               <div className="aggr-footer">
                    <Link to="/">
                        <button> Voltar</button>
                    </Link>
                    <Link to="/resultados">
                        <button > Avançar</button> 
                    </Link>
               </div>
            </div>
        ) 
    }

    
}

export default AgregadorMenu