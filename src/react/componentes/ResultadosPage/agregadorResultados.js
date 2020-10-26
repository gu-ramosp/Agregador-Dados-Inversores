import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow, Paper, AppBar,Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import './agregadorResultados.css'
const { ipcRenderer } = window.require("electron");

class AgregadorResultados extends Component{

    state = {
        waiting:true,
        resultados: 'undefined'
    }


    render(){
        if(this.state.waiting){
            return(

                <div className="result-body" >
    
                    <AppBar id="header" style={{height:"10%"}}>
                        <h2> Resultados das Agregações</h2>
                    </AppBar>

                    <h2 style={{textAlign:"center", marginTop:"20%"}}> Esperando processamento dos Dados</h2>
                    <CircularProgress size="8em"  style={{marginTop:"30%",marginLeft:"45%"}} />

                    <Paper id="aggr-footer" elevation={24}>
                        <Link to="/menu">
                            <Button variant="contained"  id="graficos-btn" color="primary">
                                Voltar
                            </Button>
                        </Link>
                    </Paper>
                
                </div>
            ) 
        }
        else{
            return (
                <div className="result-body" >
    
                    <AppBar id="header" style={{height:"10%"}}>
                        <h2> Resultados das Agregações</h2>
                    </AppBar>

                    <TableContainer id="tabela-result" style={{marginTop:"10%"}} component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center"> Variável Agregada</TableCell>
                                <TableCell align="center">Resultado da agregação</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {Object.entries(this.state.resultados).map((key) => (
                                <TableRow key={key[0]}>
                                <TableCell  align="center" component="th" scope="row">
                                    {key[0]}
                                </TableCell>
                                <TableCell align="center">{key[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Paper id="aggr-footer" elevation={24}>
                        <Link to="/menu">
                            <Button variant="contained"  id="graficos-btn" color="primary">
                                Voltar
                            </Button>
                        </Link>
                    </Paper>
        
            </div>

            )
        }
        
    }

    debug = () =>{
        console.log(this.state)
        this.setState({mudado:"dsfd",outro:"sdflj", teste:"lol"})
    }

    aggr_results = ipcRenderer.on("makeAggregation_Result", (event, arg) => {
        console.log("o que eu quero")
        console.log(arg)
        delete arg.CDTE;
        delete arg.CIGS;
        delete arg.MONO;
        delete arg.POLI;
        delete arg.data_inicio;
        delete arg.data_fim;
        delete arg.cidade;

        

        var excluir = new Array();
        for (const [key, value] of Object.entries(arg)) {

            switch(key){
                case "vdc":
                    arg["Tensão DC"] = arg[key];
                    delete arg[key];
                    break;
                case "idc":
                    arg["Corrente DC"] = arg[key];
                    delete arg[key];
                    break;
                case "vac":
                    arg["Tensão AC"] = arg[key];
                    delete arg[key];
                    break;
                case "iac":
                    arg["Corrente AC"] = arg[key];
                    delete arg[key];
                    break;
                case "freq":
                    arg["Frequência"] = arg[key];
                    delete arg[key];
                    break;
                case "pac":
                    arg["Potência AC"] = arg[key];
                    delete arg[key];
                    break;
                case "frq":
                    arg["Frequência"] = arg[key];
                    delete arg[key];
                    break;
                case "ene":
                    arg["Energia Total"] = arg[key];
                    delete arg[key];
                    break;
                case "whs":
                    arg["whs"] = arg[key];
                    break;
            }
            //TODO: Separar abaixo em outro loop para excluir instancias vazias
            if(value==""){
                excluir.push(key)
            }
        }

        this.state.waiting = false;

        excluir.forEach(key=>{
            console.log(`excluindo ${key}`)
            delete arg[key]
        })
        console.log(arg)
        this.setState({resultados: arg})

    })

    useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

 
    
    
}

export default AgregadorResultados