import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import Header from '../components/Header';

function Favorites() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('jwtToken');
            console.log(token)
            if (!token) {
                console.error('Token não encontrado. Faça login novamente.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/favoritos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.eventos);
                } else {
                    console.error('Erro ao buscar eventos favoritos');
                }
            } catch (error) {
                console.error('Erro ao buscar eventos favoritos:', error);
            }
        };

        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (eventId) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('Token não encontrado. Faça login novamente.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/favoritos/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setEvents(events.filter(event => event._id !== eventId));
                console.log('Evento removido dos favoritos com sucesso');
            } else {
                console.error('Erro ao remover evento dos favoritos');
            }
        } catch (error) {
            console.error('Erro ao remover evento dos favoritos:', error);
        }
    };

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
                        {events.length > 0 ? events.map((event) => (
                            <Card key={event._id} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{event.titulo}</Typography>
                                    <Typography color="text.secondary">{event.data}</Typography>
                                    <Typography color="text.secondary">{event.local}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Ver Detalhes
                                    </Button>
                                    <Button size="small" color="secondary" onClick={() => handleRemoveFavorite(event._id)}>
                                        Remover dos Favoritos
                                    </Button>
                                </CardActions>
                            </Card>
                        )) : <Typography>Sem eventos favoritos para mostrar.</Typography>}
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Favorites;
