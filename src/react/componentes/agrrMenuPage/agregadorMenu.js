import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button, Input,Divider,MenuItem,TextField,AppBar,Paper,makeStyles,FormHelperText,FormControl,Select,InputLabel} from '@material-ui/core';
const { ipcRenderer } = window.require("electron");
import TableMenu from './tabelaMenu';
import './agregadorMenu.css'


class AgregadorMenu extends Component{

    state = {
        agrr_selections : [ 
            {name: 'vdc',selectorType:'limited',disabled:true, aggrType:''}, //Tensão DC
            {name: 'idc',selectorType:'limited',disabled:true, aggrType:''},//Corrente DC
            {name:  'vac', selectorType:'limited',disabled:true, aggrType:''}, // Tensão AC
            {name: 'iac',selectorType:'limited',disabled:true, aggrType:''}, //Corrente AC
            {name:'freq',selectorType:'full',disabled:true, aggrType:''}, //Frequêcia
            {name: 'pac',selectorType:'limited',disabled:true, aggrType:''}, //Potência AC
            {name: 'ene', selectorType:'limited',disabled:true, aggrType:''}, //Energia Total
            {name: 'whs',selectorType:'limited',disabled:true, aggrType:''},
        ],
        start_date: "",
        end_date: "",
        tech_type: "",
        tech_type:"Todos"
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
                                data-date-format="DD MMMM YYYY" 
                                onChange={this.handleChange('start_date')}
                                label="Data Inicial"
                                type="date"
                                variant="outlined"
                                defaultValue="27-08-2017"
                                InputLabelProps={{shrink: true,}}
                    />
                    <TextField
                                data-date-format="DD MMMM YYYY" 
                                className="date-selector"
                                id="date"
                                format="yyyy-MM-dd HH:mm:ss"
                                onChange={this.handleChange('end_date')}
                                label="Data Final"
                                type="date"
                                variant="outlined"
                                defaultValue="28-08-2017"
                                InputLabelProps={{shrink: true,}}
                    />
                </div>

                <div className="tech-type-menu">
                    <Divider></Divider>
                    <div id="interno">
                        Tipo de Tecnologia do painel:
                        <FormControl variant="outlined"   style={{marginLeft:"5em",marginTop:"0.5em",width:"20em",marginBottom:"0.5em"}} >
                            <Select
                                name={'tech_type'}
                                value={this.state.tech_type}
                                onChange={this.handleChange('tech_type')}
                            >
                                <MenuItem value={"CDTE"}>CDTE</MenuItem>
                                <MenuItem value={"CIGS"}>CIGS</MenuItem>
                                <MenuItem value={"MONO"}>MONO</MenuItem>
                                <MenuItem value={"POLI"}>POLI</MenuItem>
                            </Select>
                        </FormControl>
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
        ipcRenderer.send("makeAggregation", { 
            data_inicio:    this.state.start_date,
            data_fim:       this.state.end_date,
            tech_type:      this.state.tech_type,
            vdc:            this.state.agrr_selections[0].aggrType,
            idc:            this.state.agrr_selections[1].aggrType,
            vac:            this.state.agrr_selections[2].aggrType,
            iac:            this.state.agrr_selections[3].aggrType,
            freq:           this.state.agrr_selections[4].aggrType, 
            pac:            this.state.agrr_selections[5].aggrType,
            ene:            this.state.agrr_selections[6].aggrType,
            whs:            this.state.agrr_selections[7].aggrType,
        })
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
                return { name:selection.name, aggrType:event.target.value, selectorType:selection.selectorType, disabled: selection.disabled }
            }
            else{
                return { name:selection.name, aggrType:selection.aggrType, selectorType:selection.selectorType, disabled: selection.disabled }
            }
        })
        this.setState({agrr_selections})
        console.log(this.state)
      }
    
     
}

export default AgregadorMenu