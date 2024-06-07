import React, { useState } from 'react';
import FormToken from '../components/FormToken'
import { Container } from '@mui/material';
import Header from '../components/Header';

function Token() {
    return (
        <>
          <Header/>
          <Container maxWidth="sm">
              <FormToken />
          </Container>
        </>
    );
}

export default Token;