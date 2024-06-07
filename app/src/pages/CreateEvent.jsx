import React, { useState } from 'react';
import { Container, CssBaseline, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    data: '',
    local: '',
    horario: '',
    tipo: '',
    area: '',
    status: 'Pendente',
    imagem: null
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, imagem: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('Token não encontrado. Faça login novamente.');
      return;
    }

    console.log('Token encontrado:', token);

    const form = new FormData();
    form.append('titulo', formData.titulo);
    form.append('descricao', formData.descricao);
    form.append('valor', formData.valor);
    form.append('data', formData.data);
    form.append('local', formData.local);
    form.append('horario', formData.horario);
    form.append('tipo', formData.tipo);
    form.append('area', formData.area);
    form.append('status', formData.status);
    form.append('imagem', formData.imagem);

    console.log('Form data prepared:', form);

    try {

      const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/eventos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });

      console.log('Server response:', response);

      if (response.ok) {
        // Sucesso ao criar evento
        console.log('Evento criado com sucesso');
        Navigate('/')
      } else {
        // Erro ao criar evento
        const errorData = await response.json();
        console.log('Server error response:', errorData);
        setError(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.log('Catch block error:', error);
      setError('Erro ao tentar criar o evento. Por favor, tente novamente mais tarde.');
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
          <Typography component="h1" variant="h5">
            Cadastrar Evento
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Título do evento"
              name="titulo"
              autoFocus
              value={formData.titulo}
              onChange={handleChange}
              InputProps={{
                style: { borderRadius: '30px'}
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Descrição do evento"
              name="descricao"
              multiline
              rows={4}
              value={formData.descricao}
              onChange={handleChange}
              InputProps={{
                style: { borderRadius: '30px'}
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Valor do evento"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              InputProps={{
                style: { borderRadius: '30px'}
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Data do evento"
              name="data"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.data}
              onChange={handleChange}
              InputProps={{
                style: { borderRadius: '30px'}
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Local do evento"
              name="local"
              value={formData.local}
              onChange={handleChange}
              InputProps={{
                style: { borderRadius: '30px'}
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Horário do evento"
              name="horario"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.horario}
              onChange={handleChange}
              InputProps={{
                style: { borderRadius: '30px'}
              }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="tipo-evento-label">Tipo de evento</InputLabel>
              <Select
                labelId="tipo-evento-label"
                id="tipo-evento"
                name="tipo"
                value={formData.tipo}
                label="Tipo de evento"
                onChange={handleChange}
                style={{ borderRadius: '30px' }}
              >
                <MenuItem value="Musica">Musica</MenuItem>
                <MenuItem value="Esporte">Esporte</MenuItem>
                <MenuItem value="Cinema e Teatro">Cinema e Teatro</MenuItem>
                <MenuItem value="Oficina">Oficina</MenuItem>
                <MenuItem value="Comida / Gastronomia">Comida / Gastronomia</MenuItem>
                <MenuItem value="Museu">Museu</MenuItem>
                <MenuItem value="Dança">Dança</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="area-evento-label">Área do evento</InputLabel>
              <Select
                labelId="area-evento-label"
                id="area-evento"
                name="area"
                value={formData.area}
                label="Área do evento"
                onChange={handleChange}
                style={{ borderRadius: '30px' }}
              >
                <MenuItem value="Dentro de Heliópolis">Dentro de Heliópolis</MenuItem>
                <MenuItem value="Fora de Heliópolis">Fora de Heliópolis</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2, borderRadius: '30px', color: 'white', backgroundColor: '#3f51b5'}}
            >
              Upload Imagem
              <input
                type="file"
                name="imagem"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2, borderRadius: '30px'}}
            >
              Cadastrar Evento
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateEvent;
