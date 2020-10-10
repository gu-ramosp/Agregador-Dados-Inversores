import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
    formControl: {
      margin: "0.5em",
      minWidth: "20em",
      display:"flex",
    },
    selectEmpty: {
      marginTop: "1em",
    },
  }));
  


export function SelectorInput(props){  

    if(props.selectorType == "limited"){
        return    <h4 style={{"textAlign":"center"}}> Total</h4>
    }

    else{
        return    <FormControl variant="outlined" className={useStyles().formControl}>
                    <InputLabel >Tipo de Agregação</InputLabel>
                    <Select
                      disabled={props.disabled}
                      name={props.aggrName}
                      value={props.aggrType}
                      onChange={props.changeSelection}
                      label="Tipo de Agregação"
                    >
                      <MenuItem value={"mean"}>Média</MenuItem>
                      <MenuItem value={"median"}>Mediana</MenuItem>
                      <MenuItem value={"sum"}>Soma</MenuItem>
                      <MenuItem value={"max"}>Máximo</MenuItem>
                      <MenuItem value={"min"}>Mínimo</MenuItem>
                    </Select>
                  </FormControl>
    }
}