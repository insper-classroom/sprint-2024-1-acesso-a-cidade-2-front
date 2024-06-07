import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

function Filtro({Nome, corFundo, corTexto, conteudo}){
  return(
    <Accordion style={{ borderRadius: '20px' }} sx={{backgroundColor: corFundo, color: corTexto, mb: 2, border: '1px solid #757575'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: corTexto}}/>}
        aria-controls="filtros-content"
        id="filtros-header"
        sx={{display: 'flex',
             justifyContent: 'center',
             '& .MuiAccordionSummary-content': {justifyContent: 'center', textAlign: 'center', marginLeft: '5%'},}}

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