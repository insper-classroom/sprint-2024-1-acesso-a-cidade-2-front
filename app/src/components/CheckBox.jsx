import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

function CheckBox({opcoes}){

    const lista = opcoes

    return (
        <FormGroup>
        {
            lista.map((opcao) => (
                <FormControlLabel control={<Checkbox />} label={opcao} />

        ))}
        </FormGroup>
    );
    }

export default CheckBox;