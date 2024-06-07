import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Header from '../components/Header';
import Evento from '../components/Evento';  // Certifique-se de que este caminho está correto

function Favorites() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = (event) => {
        console.log("Event clicked:", event);  // Isso deve registrar as informações do evento no console
        setSelectedEvent(event);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedEvent(null);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setError('Token não encontrado. Faça login novamente.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/favoritos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Favorite event IDs:', data.eventos);
                    if (!Array.isArray(data.eventos)) {
                        throw new Error('Estrutura de dados inválida do endpoint /favoritos');
                    }
                    fetchEventDetails(data.eventos, token);
                } else {
                    const errorMsg = await response.text();
                    setError(`Erro ao buscar eventos favoritos: ${errorMsg}`);
                    setLoading(false);
                }
            } catch (error) {
                setError(`Erro ao buscar eventos favoritos: ${error.message}`);
                setLoading(false);
            }
        };

        const fetchEventDetails = async (eventIDs, token) => {
            try {
                const validEventIDs = eventIDs.filter(id => id && typeof id === 'string');
                if (validEventIDs.length === 0) {
                    // Defina uma mensagem de aviso quando não houver eventos favoritos
                    setLoading(false);
                    return;
                }

                const eventsDetails = await Promise.all(validEventIDs.map(async id => {
                    console.log('Fetching details for event ID:', id);  // Registrar cada ID de evento sendo buscado
                    if (id && typeof id === 'string' && id !== 'undefined') {
                        const response = await fetch(`https://sprint-2024-1-acesso-a-cidade-2.onrender.com/favoritos/${id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            }
                        });
                        if (!response.ok) {
                            throw new Error(`Evento ${id} não encontrado`);
                        }
                        const eventDetails = await response.json();
                        return { ...eventDetails, id }; // Adicionar o ID do evento
                    } else {
                        console.error('ID de evento inválido:', id);
                        return null;
                    }
                }));
                setEvents(eventsDetails.filter(event => event !== null));
            } catch (error) {
                setError(`Erro ao buscar detalhes dos eventos: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <>
            <Header />
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Eventos Favoritos
                    </Typography>
                    <Box sx={{ mt: 2, width: '100%' }}>
                        {loading ? (
                            <p>Carregando...</p>
                        ) : (
                            events.length > 0 ? (
                                events.map((event) => (
                                    <Evento
                                        onImageClick={handleClickOpen}
                                        key={event.id} // Usar o _id recuperado do servidor como identificador único
                                        info={{
                                            image: event.imageUrl,
                                            title: event.titulo,
                                            description: event.descricao,
                                            date: event.data,
                                            location: event.local,
                                            horario: event.horario,
                                            id: event.id // Usar o _id recuperado do servidor
                                        }}
                                    />
                                ))
                            ) : (
                                <Typography>Você não tem eventos favoritos.</Typography>
                            )
                        )}
                    </Box>
                </Box>
            </Container>
            {selectedEvent && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{selectedEvent.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Descrição: {selectedEvent.description}<br/>
                            Local: {selectedEvent.location}<br/>
                            Data: {selectedEvent.date}<br/>
                            Horário: {selectedEvent.horario}<br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Fechar</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default Favorites;
