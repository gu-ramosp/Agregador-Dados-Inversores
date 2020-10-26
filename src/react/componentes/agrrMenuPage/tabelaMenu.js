import React, {Component} from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {SelectorInput} from "./selectorInput"

class TableMenu extends Component{


  render(){
    return(
      <TableContainer componnent={Paper} >
      <Table  size="small" aria-label="simple table" style={{ minWidth: 650,margin:0}}>
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
              <TableCell component="th" scope="row">
                <SelectorInput  changeSelection={this.changeSelection} aggrType={row.aggrType} selectorType={row.selectorType} aggrName={row.name} disabled={row.disabled}></SelectorInput>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }


  toggleCheck = (e) =>{
    this.props.toggleCheck(e)
  }

  changeSelection = (e) => {
    this.props.changeSelection(e)
  }

}
  
export default TableMenu