import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

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

export default Filtro;