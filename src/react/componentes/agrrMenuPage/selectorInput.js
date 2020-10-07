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

    if(props.aggrType == "limited"){
        return    <FormControl variant="outlined" className={useStyles().formControl}>
                    <InputLabel >Tipo de Agregação</InputLabel>
                    <Select
                      name={props.aggrName}
                      value={props.aggrType}
                      onChange={props.changeSelection}
                      label="Tipo de Agregação"
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={"Soma"}>Soma</MenuItem>
                      <MenuItem value={"outro"}>Outro</MenuItem>
                    </Select>
                  </FormControl>
    }

    else{
        return    <FormControl variant="outlined" className={useStyles().formControl}>
                    <InputLabel >Tipo de Agregação</InputLabel>
                    <Select
                      name={props.aggrName}
                      value={props.aggrType}
                      onChange={props.changeSelection}
                      label="Tipo de Agregação"
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={"media"}>Média</MenuItem>
                      <MenuItem value={"mediana"}>Mediana</MenuItem>
                      <MenuItem value={"Soma"}>Soma</MenuItem>
                    </Select>
                  </FormControl>
    }
}