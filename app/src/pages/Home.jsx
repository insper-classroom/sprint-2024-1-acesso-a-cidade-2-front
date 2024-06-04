import { useState } from 'react'
import React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header'
import Filtro from '../components/Filtro'
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Home(){
    return (
        <>
          <Header />
          <Container maxWidth="sm" sx={{mt: 5}}>
            <Filtros />
          </Container>
        </>
        );
}

function Filtros() {
    return(
      <Filtro Nome={'Filtros'} corFundo={'#1976D2'} corTexto={'white'} 
      conteudo={
      <>
      <Filtro Nome='Preço' corTexto={'#757575'} conteudo={<RangeSlider />}/>
      <Filtro Nome='Tipo de Evento' corTexto={'#757575'} conteudo={<CheckBox />}/>

      </>
      }/>
      
    );
  }

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

function RangeSlider(){
    const [value, setValue] = React.useState([0, 100]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return(
      <Slider
        getAriaLabel={() => 'Preço'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    );
  }

export default Home;