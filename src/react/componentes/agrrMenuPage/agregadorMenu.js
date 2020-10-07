import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button, Input,Divider,MenuItem,TextField,AppBar,Paper} from '@material-ui/core';
const { ipcRenderer } = window.require("electron");
import TableMenu from './tabelaMenu';
import './agregadorMenu.css'


class AgregadorMenu extends Component{

    state = {
        agrr_selections : [ 
            {name:'timestamp',selectorType:'full',disabled:true},
            {name: 'vdc',selectorType:'limited',disabled:true}, //Tensão DC
            {name: 'idc',selectorType:'limited',disabled:true},//Corrente DC
            {name:  'vac', selectorType:'limited',disabled:true}, // Tensão AC
            {name: 'iac',selectorType:'limited',disabled:true}, //Corrente AC
            {name:'freq',selectorType:'full',disabled:true}, //Frequêcia
            {name: 'pac',selectorType:'limited',disabled:true}, //Potência AC
            {name: 'ene', selectorType:'limited',disabled:true}, //Energia Total
            {name: 'whs',selectorType:'limited',disabled:true},
            {name:'mod',selectorType:'limited',disabled:true}
        ],
        start_date: "",
        end_date: "",
        tech_type: "",
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

    handleChange = input => e => {this.setState({[input]: e.target.value})}

    enviaDados = () =>{
        ipcRenderer.send("makeAggregation", this.state)
    }

    toggleCheck = (event) =>{
        var agrr_selections = this.state.agrr_selections
        agrr_selections = agrr_selections.map( (selection)=>{
            if(selection.name == event.target.name){
                return { name:selection.name, selectorType:selection.selectorType, disabled: !selection.disabled }
            }
            else{
                return { name:selection.name, selectorType:selection.selectorType, disabled: selection.disabled }
            }
        })
        this.setState({agrr_selections})
        console.log(this.state)
      }


    changeSelection = (event) =>{
        var agrr_selections = this.state.agrr_selections
        agrr_selections = agrr_selections.map( (selection)=>{
            if(selection.name == event.target.name){
                return { name:selection.name, selectorType:event.target.value, disabled: selection.disabled }
            }
            else{
                return { name:selection.name, selectorType:selection.selectorType, disabled: selection.disabled }
            }
        })
        this.setState({agrr_selections})
        console.log(this.state)
      }
      
}

export default AgregadorMenu