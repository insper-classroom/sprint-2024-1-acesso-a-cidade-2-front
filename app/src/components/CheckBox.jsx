import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

function CheckBox({opcoes, selectedOptions, handleChange}){

    const lista = opcoes

    return (
        <FormGroup>
        {
            lista.map((opcao, index) => (
                <FormControlLabel key={index} control={<Checkbox checked={selectedOptions.includes(opcao)} onChange={() => handleChange(opcao)} />} label={opcao} />

        ))}
        </FormGroup>
    );
    }

export default CheckBox;