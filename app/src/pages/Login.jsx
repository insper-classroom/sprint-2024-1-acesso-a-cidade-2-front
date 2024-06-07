import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, CssBaseline, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (response.status == 200) {
        login(data.token);
        localStorage.setItem("email", email);
        localStorage.setItem("senha", senha);
        if(data.admin){
          navigate('/admin');
        } else{
          navigate('/');
        }
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <>
    <Header />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="h4" gutterBottom>
                Login
            </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { borderRadius: '30px' }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            InputProps={{
              style: { borderRadius: '30px' }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: '30px'}}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default Login;