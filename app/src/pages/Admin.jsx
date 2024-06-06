import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Card, CardMedia, CardContent } from '@mui/material';
import Header from '../components/Header';

const AdminPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const events = [
    { id: 1, name: 'Evento 1', description: 'Descrição do Evento 1', date: '2023-06-15', location: 'Local 1', imageUrl: 'https://imgs.search.brave.com/ZDno8QOXgUfXHIdkiCsPfqG71jxI5gHS_yngR8tnhjk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/c2NlbmljLW1vdW50/YWluLWxhbmRzY2Fw/ZS5qcGc_d2lkdGg9/MTAwMCZmb3JtYXQ9/cGpwZyZleGlmPTAm/aXB0Yz0w' },
    { id: 2, name: 'Evento 2', description: 'Descrição do Evento 2', date: '2023-07-20', location: 'Local 2', imageUrl: 'https://imgs.search.brave.com/ZDno8QOXgUfXHIdkiCsPfqG71jxI5gHS_yngR8tnhjk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/c2NlbmljLW1vdW50/YWluLWxhbmRzY2Fw/ZS5qcGc_d2lkdGg9/MTAwMCZmb3JtYXQ9/cGpwZyZleGlmPTAm/aXB0Yz0w' },
  ];

  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleApprove = () => {
    // Lógica de aprovação do evento
    console.log(`Evento ${selectedEvent.id} aprovado!`);
    handleClose();
  };

  const handleReject = () => {
    // Lógica de rejeição do evento
    console.log(`Evento ${selectedEvent.id} rejeitado!`);
    handleClose();
  };

  return (
    <>
    <Header />
    <Container>
      <Typography variant="h4" gutterBottom>
        Eventos para Aprovação
      </Typography>
      <List>
        {events.map((event) => (
          <ListItem button key={event.id} onClick={() => handleClickOpen(event)}>
            <ListItemText primary={event.name} secondary={event.date} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.name}</DialogTitle>
        <DialogContent>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={selectedEvent?.imageUrl}
              alt={selectedEvent?.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {selectedEvent?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedEvent?.description}
              </Typography>
              <Box mt={2}>
                <Typography variant="body1">
                  Data: {selectedEvent?.date}
                </Typography>
                <Typography variant="body1">
                  Local: {selectedEvent?.location}
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