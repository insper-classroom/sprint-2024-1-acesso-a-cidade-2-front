import React, { useState } from 'react';
import { Container, CssBaseline, Box, TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';
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
    status: '',
    imagem: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, imagem: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implementar a lógica de envio de dados aqui
    console.log('Dados enviados:', formData);
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Valor do evento"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Local do evento"
              name="local"
              value={formData.local}
              onChange={handleChange}
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tipo de evento"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Área do evento"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Status do evento"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
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
              sx={{ mt: 3, mb: 2 }}
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
