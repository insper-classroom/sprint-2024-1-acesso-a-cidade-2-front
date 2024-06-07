import React, { useState } from 'react';
import FormSenha from '../components/FormSenha'
import { Container } from '@mui/material';
import Header from '../components/Header';

function Senha() {
    return (
        <>
          <Header/>
          <Container maxWidth="sm">
              <FormSenha />
          </Container>
        </>
    );
}

export default Senha;