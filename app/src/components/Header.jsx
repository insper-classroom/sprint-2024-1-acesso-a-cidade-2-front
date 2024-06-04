import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import React from 'react';

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

  export default Header;