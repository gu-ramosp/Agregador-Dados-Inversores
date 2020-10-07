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

class TableMenu extends Component{


  render(){
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
           {this.props.agrr_selections.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Checkbox defaultCheckedcolor="primary"  color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} name={row.name}  onChange={this.toggleCheck}/>
                {row.name}
              </TableCell>
              <SelectorInput  changeSelection={this.changeSelection} aggrType={row.selectorType} aggrName={row.name} disabled={row.disabled}></SelectorInput>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
      margin:0
    },
  });
  
  toggleCheck = (e) =>{
    this.props.toggleCheck(e)
  }

  changeSelection = (e) => {
    this.props.changeSelection(e)
  }

}
  
export default TableMenu