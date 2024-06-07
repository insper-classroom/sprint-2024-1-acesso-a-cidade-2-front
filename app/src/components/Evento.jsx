import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

export default function Evento({ info, onImageClick, onFavoriteClick }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoritedEvents = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('Token não encontrado. Faça login novamente.');
        return;
      }
      try {
        const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/favorito', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const favoritedEventIds = data.eventos;
          console.log('Favorited events:', favoritedEventIds);
          if (favoritedEventIds.includes(info.id)) {
            setIsFavorited(true);
          }
        } else {
          console.error('Erro ao buscar eventos favoritados');
        }
      } catch (error) {
        console.error('Erro ao tentar buscar eventos favoritados:', error);
      }
    };
    fetchFavoritedEvents();
  }, [info.id]);

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token não encontrado. Faça login novamente.');
      return;
    }
    const method = isFavorited ? 'DELETE' : 'POST'; // Determine the method based on the current favorite state
    const url = `https://sprint-2024-1-acesso-a-cidade-2-front.vercel.app/favoritos/${info.id}`;
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log(`Evento ${info.id} ${isFavorited ? 'desfavoritado' : 'favoritado'} com sucesso.`);
        setIsFavorited(!isFavorited); // Toggle the favorite state
        if (onFavoriteClick) {
          onFavoriteClick(info);
        }
      } else {
        console.error(`Erro ao ${isFavorited ? 'desfavoritar' : 'favoritar'} o evento`);
      }
    } catch (error) {
      console.error(`Erro ao tentar ${isFavorited ? 'desfavoritar' : 'favoritar'} o evento:`, error);
    }
  };

  const handleClick = () => {
    handleFavoriteGetClick();
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Card sx={{ maxWidth: 545 }}>
        <CardActionArea onClick={() => onImageClick(info)}>
          {info.image ? (
            <CardMedia component="img" height="140" image={info.image} alt="evento" />
          ) : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {info.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Tooltip title="Favoritar">
            <IconButton aria-label="favoritar" onClick={handleFavoriteClick} sx={{ color: isFavorited ? 'red' : 'default' }}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
}
