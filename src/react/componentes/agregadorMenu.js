import React, {Component} from 'react';
import './agregadorMenu.css'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import BasicTable from './tabela';
import { Button, Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class AgregadorMenu extends Component{

    state ={
        age :45,
        tech_type:"CDTE"
    }

    handleChange = (event) => {
        setAge(event.target.value);
      };
    
    render(){
        return(
            <div className="other-body">
                <div id="header">
                    <AppBar style={{height:"10%"}}>
                        <h2 >Escolha o lugar de onde deseja-se obter os dados para agregação</h2>
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
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                    <TextField
                                className="date-selector"
                                id="date"
                                label="Data Final"
                                type="date"
                                variant="outlined"
                                defaultValue="2020-05-24"
                                InputLabelProps={{
                                shrink: true,
                                }}
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
                                style={{marginLeft:"5em",marginTop:"0.5em",width:"20em"}}
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
                      
                </div>
               
               <div className="var-options">
                   
                    <BasicTable></BasicTable>
               </div>
              
               <Paper id="aggr-footer" elevation={24}>
                    <Link to="/">
                        <Button variant="contained"  id="graficos-btn" color="primary">
                            Voltar
                        </Button>
                    </Link>
                    <h2>OU</h2>
                    <Link to="/resultados">
                        <Button variant="contained" id="graficos-btn" color="primary">
                            Avançar 
                        </Button>
                    </Link>
                </Paper>
                
            </div>
        ) 
    }

    
}

export default AgregadorMenu