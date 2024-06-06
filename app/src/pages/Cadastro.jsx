import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import FormCadastro from '../components/FormCadastro'
import { Container } from '@mui/material';
import Header from '../components/Header';

function Cadastro() {
    return (
        <>
          <Header/>
          <Container maxWidth="sm">
              <FormCadastro />
          </Container>
        </>
    );
}



export default Cadastro;
