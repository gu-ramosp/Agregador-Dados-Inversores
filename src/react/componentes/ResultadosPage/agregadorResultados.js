import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow, Paper} from '@material-ui/core';

// import './agregadorResultados.css'
const { ipcRenderer } = window.require("electron");

class AgregadorResultados extends Component{

    state = {
    }


    render(){
        return(
            <div className="result-body">


                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell> Variável Agregada</TableCell>
                            <TableCell align="right">Resultado da agregação</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {Object.entries(this.state).map((key) => (
                            <TableRow key={key[0]}>
                            <TableCell component="th" scope="row">
                                {key[0]}
                            </TableCell>
                            <TableCell align="right">{key[1]}</TableCell>
         
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <button onClick={this.debug}>
                    debug
                </button>
                <Link to="/menu">
                    <button>
                        voltar inicio
                    </button>
                </Link>
            </div>
        ) 
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
            if(value==""){
                excluir.push(key)
            }
        }
        excluir.forEach(key=>{
            console.log(`excluindo ${key}`)
            delete arg[key]
        })
        console.log(arg)
        this.setState(arg)
    })

    useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

 
    
    
}

export default AgregadorResultados