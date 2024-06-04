import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

function CheckBox(){
    return (
        <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Musica" />
        <FormControlLabel control={<Checkbox />} label="Oficina" />
        <FormControlLabel control={<Checkbox />} label="Comida / Gastronomia" />
        <FormControlLabel control={<Checkbox />} label="Cinema e Teatro" />
        <FormControlLabel control={<Checkbox />} label="Museu" />
        <FormControlLabel control={<Checkbox />} label="Dança" />
        <FormControlLabel control={<Checkbox />} label="Esporte" />
        </FormGroup>
    );
    }

export default CheckBox;