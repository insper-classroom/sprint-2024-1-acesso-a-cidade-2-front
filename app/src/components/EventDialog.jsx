import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardMedia, CardContent, Typography, Box, List } from '@mui/material';

const EventDialog = ({ event, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{event?.title}</DialogTitle>
      <DialogContent>
        <Card sx = {{borderRadius: 5}}>
          <CardMedia
            component="img"
            height="200"
            image={event?.image}
            alt={event?.title}            
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            </Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
            <Box mt={2}>
              <Typography variant="body1" marginTop={1} justifyContent="center" display="flex">
                Data: {event?.date}
              </Typography>
              <Typography variant="body1" marginTop={1} justifyContent="center" display="flex">
                Horário: {event?.horario}
              </Typography>
              <Typography variant="body1" marginTop={1} justifyContent="center" display="flex">
                Local: {event?.location}
              </Typography>

            </Box>
              <Typography variant="body1" marginTop={2}>
               {event?.description}
              </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
