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

  export default function BasicTable() {
    const classes = useStyles();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table}  size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Variável a Agregar</TableCell>
              <TableCell align="center">
                  Tipo de Agregação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                <Checkbox inputProps={{ 'aria-label': 'select all desserts' }}/>
                  {row.name}
                </TableCell>
                <TableCell align="center">
                <TextField 
                                id="standard-select-currency"
                                select
                                variant="outlined"
                                style={{marginLeft:"5em",marginTop:"0.5em",width:"20em"}}
                                value={"nulo"}
                            >
                                <MenuItem>
                                    sddfghgfhfgh
                                </MenuItem>
                                <MenuItem>
                                    sddfghgfhfgh
                                </MenuItem>
                            </TextField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }