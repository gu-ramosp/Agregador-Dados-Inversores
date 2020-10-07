import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button, Input,Divider,MenuItem,TextField,AppBar,Paper} from '@material-ui/core';
import TableMenu from './tabelaMenu';
import './agregadorMenu.css'


class AgregadorMenu extends Component{

    state = {
        agrr_selections : {    
            timestamp: 'limited',
            vdc: 'full',  //Tensão DC
            idc: 'limited', //Corrente DC
            vac: '13', // Tensão AC
            iac: '48', //Corrente AC
            freq: '41', //Frequêcia
            pac: '41', //Potência AC
            ene: '42', //Energia Total
            whs: 'dv4',
            mod: '2',
            data:'kls'
        },
        tech_type:"CDTE"
      }

    render(){
        return(
            <div className="other-body">

                <div id="header">
                    <AppBar style={{height:"10%"}}>
                        <h2 >Escolha quais variáveis e tipo de agregação serão realizadas</h2>
                    </AppBar>
                </div>
              
                <div className="data-selector">
                    <TextField 
                                style={{margin:"0.5em"}}
                                className="date-selector"
                                id="date"
                                label="Data Inicial"
                                type="date"
                                variant="outlined"
                                defaultValue="2017-05-24"
                                InputLabelProps={{shrink: true,}}
                    />
                    <TextField
                                className="date-selector"
                                id="date"
                                label="Data Final"
                                type="date"
                                variant="outlined"
                                defaultValue="2020-05-24"
                                InputLabelProps={{shrink: true,}}
                    />
                </div>

                <div className="tech-type-menu">
                    <Divider></Divider>
                    <div id="interno">
                        Tipo de Tecnologia do painel:
                            <TextField 
                                id="standard-select-currency"
                                select
                                variant="outlined"
                                style={{marginLeft:"5em",marginTop:"0.5em",width:"20em",marginBottom:"0.5em"}}
                                value={this.state.tech_type}
                            >
                                <MenuItem>
                                    sddfghgfhfgh
                                </MenuItem>
                                <MenuItem>
                                    sddfghgfhfgh
                                </MenuItem>
                            </TextField>
                    </div>
                    <Divider></Divider>
                </div>
               
               <div className="var-options">
                    <TableMenu 
                        changeSelection={this.changeSelection} 
                        agrr_selections={this.state.agrr_selections}
                        toggleCheck={this.toggleCheck} 
                    />    
               </div>
              
               <Paper id="aggr-footer" elevation={24}>
                    <Link to="/">
                        <Button variant="contained"  id="graficos-btn" color="primary">
                            Voltar
                        </Button>
                    </Link>
                    <h2>OU</h2>
                    <Link to="/resultados">
                        <Button variant="contained" id="graficos-btn" color="primary" onClick={this.enviaDados}>
                            Avançar 
                        </Button>
                    </Link>
                </Paper>
                
            </div>
        ) 
    }

    enviaDados = () =>{
 

    }

    toggleCheck = (e) =>{
        console.log(e.target.name)
      }


    changeSelection = (event) =>{
        var agrr_selections = {...this.state.agrr_selections}
        agrr_selections[event.target.name] = event.target.value;
        this.setState({agrr_selections})
        console.log(this.state)
        console.log(event)
      }
      

    handleChange = (event) => {
        setAge(event.target.value);
      };
    
}

export default AgregadorMenu