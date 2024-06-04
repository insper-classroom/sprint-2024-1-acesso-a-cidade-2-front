import { useState } from 'react'
import './styles/App.css'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function App() {

  return (
  <>
    <Header />
    <Container maxWidth="sm" sx={{mt: 5}}>
      <Filtros />
    </Container>
  </>
  );
}

function Header() {
  return (
    <AppBar position="static" sx={{height: 100, display: 'flex', justifyContent: 'center'}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-evenly'}}>
      <Avatar alt="Logo" src="" sx={{ mr: 2, width: 60, height: 60}} variant='square'/>
        <Button href='' variant='outlined' color='inherit'>CADASTRO</Button> 
        <Button href='' variant='outlined' color='inherit'>LOGIN</Button>
      </Toolbar>
    </AppBar>
  );
}

function Filtros() {
  return(
    <Filtro Nome={'Filtros'} corFundo={'#1976D2'} corTexto={'white'} 
    conteudo={
    <>
    <Filtro Nome='Preço' corTexto={'#757575'} conteudo={<RangeSlider />}/>
    <Filtro Nome='Tipo de Evento' corTexto={'#757575'} conteudo={<CheckBox />}/>
    <Filtro Nome='Data' corTexto={'#757575'} conteudo={<DataPicker />}/>
    </>
    }/>
    
  );
}

function Filtro({Nome, corFundo, corTexto, conteudo}){
  return(
    <Accordion sx={{backgroundColor: corFundo, color: corTexto, mb: 2}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: corTexto}}/>}
        aria-controls="filtros-content"
        id="filtros-header"
      >
        {Nome}
      </AccordionSummary>
      <AccordionDetails>
        {conteudo}
      </AccordionDetails>
    </Accordion>
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

function DataPicker(){

}

export default App
