import React, { useState } from 'react';
import FormSenha from '../components/FormSenha'
import { Container } from '@mui/material';
import Header from '../components/Header';

function RedefinicaoSenha() {
    return (
        <>
          <Header/>
          <Container maxWidth="sm">
              <FormToken />
          </Container>
          <Container maxWidth="sm">
              <FormSenha />
          </Container>
        </>
    );
}

export default RedefinicaoSenha;