import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import Header from '../components/Header';

function Favorites() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // CHAMADA DE API AQUI COLOCAR A ROTA E O JWT 
        fetch('/api/favorites')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
            })
            .catch(error => {
                console.error('Erro ao buscar eventos favoritos:', error);
            });
    }, []);
    // PRECISA ARRUMAR O NOME DAS VARIAVEIS 
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
                            <Card key={event.id} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{event.title}</Typography>
                                    <Typography color="text.secondary">{event.date}</Typography>
                                    <Typography color="text.secondary">{event.location}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Ver Detalhes
                                    </Button>
                                    <Button size="small" color="secondary">
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
