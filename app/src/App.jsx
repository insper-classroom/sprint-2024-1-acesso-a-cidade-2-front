import { useState } from 'react'
import './App.css'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <Header />
    <Container maxWidth="sm" sx={{mt: 5}}>
      <Filtros />
    </Container>
  </>
  )
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
    <Accordion sx={{backgroundColor: '#1976D2', color: 'white',}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Filtros
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
  )
}

export default App
