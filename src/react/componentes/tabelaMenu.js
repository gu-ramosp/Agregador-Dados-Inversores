import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {SelectorInput} from "./selectorInput"


const useStyles = makeStyles({
    table: {
      minWidth: 650,
      margin:0
    },
});
  

function createData(name, calories, fat, carbs, protein) {
  return { name };
}

const rows = [
  createData('Timestamp'),
  createData('Tensão DC',),
  createData('Corrente DC'),
  createData('Tensão AC'),
  createData('Corrente AC'),
  createData('Frequêcia'),
  createData('Potência AC'),
  createData('Energia Total'),
  createData('whs'),
];

class TableMenu extends Component{
  
  useStyles = makeStyles({
    table: {
      minWidth: 650,
      margin:0
    },
});
createData(name, calories, fat, carbs, protein) {
  return { name };
}

rows = [
  createData('Timestamp'),
  createData('Tensão DC',),
  createData('Corrente DC'),
  createData('Tensão AC'),
  createData('Corrente AC'),
  createData('Frequêcia'),
  createData('Potência AC'),
  createData('Energia Total'),
  createData('whs'),
];


  changeSelection = (e) => {
    this.props.changeSelection(e)
  }


  
  render(){
    const lista = Object.keys(this.props.agrr_selections)
    return(
      <TableContainer componnent={Paper}>
      <Table  size="small" aria-label="simple table">
        <TableHead style={{position:"sticky",position:"-webkit-sticky"}}>
          <TableRow>
            <TableCell>Variável a Agregar</TableCell>
            <TableCell align="center">
                Tipo de Agregação
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {Object.keys(this.props.agrr_selections).map((row) => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              {/* <TableCell align="center">{this.props.agrr_selections[row]}</TableCell> */}
            <SelectorInput  changeSelection={this.changeSelection} aggrType={this.props.agrr_selections[row]} aggrName={row}></SelectorInput>
            </TableRow>
          ))}
          </TableBody>
      </Table>
    </TableContainer>
    )
  }

}
  
export default TableMenu