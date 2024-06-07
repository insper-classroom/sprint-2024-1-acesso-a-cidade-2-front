import React, { useState } from 'react';
import FormUpdate from '../components/FormUpdate'
import { Container } from '@mui/material';
import Header from '../components/Header';

function Update() {
    return (
        <>
          <Header/>
          <Container maxWidth="sm">
              <FormUpdate />
          </Container>
        </>
    );
}
export default Update;