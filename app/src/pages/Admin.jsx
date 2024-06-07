import React, { useState, useEffect } from 'react';
import {
  Container, Typography, List, ListItem, ListItemText, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Box, Card, CardMedia, CardContent
} from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwtToken');

  // Verifica se o usuário é admin
  useEffect(() => {
    const verificaAdmin = async () => {
      try {
        const email = localStorage.getItem('email');
        const senha = localStorage.getItem('senha');
        const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw new Error('Algo deu errado');
        }

        if (!data.admin) {
          throw new Error('Você não é admin');
        }

        // Busca eventos após verificar que o usuário é admin
        fetchEvents();
      } catch (error) {
        console.error('Erro durante a verificação:', error);
        navigate('/');
      }
    };

    verificaAdmin();
  }, [navigate]);

  // Função para buscar eventos
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/eventos/pendente', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Algo deu errado');
      }

      const data = await response.json();
      console.log('Eventos recebidos:', data); // Log dos dados recebidos
      if (Array.isArray(data.eventos)) {
        setEvents(data.eventos); // Certifique-se de que data.eventos é um array
      } else {
        throw new Error('Formato inesperado de dados');
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para aprovar evento
  const handleApprove = async () => {
    try {
      const response = await fetch(`https://sprint-2024-1-acesso-a-cidade-2.onrender.com/eventos/${selectedEvent._id}/Aprovado`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao aprovar evento');
      }

      console.log(`Evento ${selectedEvent._id} aprovado!`);
      handleClose();
      fetchEvents(); // Recarregar a lista de eventos
    } catch (error) {
      console.error('Erro ao aprovar evento:', error);
      setError(error);
    }
  };

  // Função para rejeitar evento
  const handleReject = async () => {
    try {
      const response = await fetch(`https://sprint-2024-1-acesso-a-cidade-2.onrender.com/eventos/${selectedEvent._id}/Rejeitado`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao rejeitar evento');
      }

      console.log(`Evento ${selectedEvent._id} rejeitado!`);
      handleClose();
      fetchEvents(); // Recarregar a lista de eventos
    } catch (error) {
      console.error('Erro ao rejeitar evento:', error);
      setError(error);
    }
  };

  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Carregando eventos...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Erro ao carregar eventos: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom>
          Eventos para Aprovação
        </Typography>
        <List>
          {events.map((event) => (
            <ListItem button key={event._id} onClick={() => handleClickOpen(event)}>
              <ListItemText primary={event.titulo} secondary={event.data} />
            </ListItem>
          ))}
        </List>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedEvent?.titulo}</DialogTitle>
          <DialogContent>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={selectedEvent?.imagem}
                alt={selectedEvent?.titulo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedEvent?.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent?.descricao}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body1">
                    Data: {selectedEvent?.data}
                  </Typography>
                  <Typography variant="body1">
                    Local: {selectedEvent?.local}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReject} color="secondary">
              Rejeitar
            </Button>
            <Button onClick={handleApprove} color="primary">
              Aprovar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminPage;