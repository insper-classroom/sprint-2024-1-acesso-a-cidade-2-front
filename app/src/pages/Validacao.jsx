import React, { useState } from 'react';
import FormValidacao from '../components/FormValidacao'
import { Container } from '@mui/material';
import Header from '../components/Header';

function Validacao() {
    return (
        <>
          <Header/>
          <Container maxWidth="sm">
              <FormValidacao />
          </Container>
        </>
    );
}

export default Validacao;