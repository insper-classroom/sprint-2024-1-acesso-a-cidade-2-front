import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

export default function Evento({ info, onImageClick, onFavoriteClick }) {
  const [isFavorited, setIsFavorited] = useState(info.isFavorited);

  useEffect(() => {
    setIsFavorited(info.isFavorited);
  }, [info.isFavorited]);

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/eventos/${info.id}/favorito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(token)
        console.log(`Evento ${info.id} favoritado com sucesso.`);
        setIsFavorited(true);
        if (onFavoriteClick) {
          onFavoriteClick(info);
        }
      } else {
        console.error('Erro ao favoritar o evento');
      }
    } catch (error) {
      console.error('Erro ao tentar favoritar o evento:', error);
    }
  };

  const handleUnfavoriteClick = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/favoritos/${info.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Evento ${info.id} desfavoritado com sucesso.`);
        setIsFavorited(false);
        if (onFavoriteClick) {
          onFavoriteClick(info);
        }
      } else {
        console.error('Erro ao desfavoritar o evento');
      }
    } catch (error) {
      console.error('Erro ao tentar desfavoritar o evento:', error);
    }
  };

  const handleClick = () => {
    if (isFavorited) {
      handleUnfavoriteClick();
    } else {
      handleFavoriteClick();
    }
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => onImageClick(info)}>
          {info.image ? (
            <CardMedia
              component="img"
              height="140"
              image={info.image}
              alt="evento"
            />
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
            <IconButton
              aria-label="favoritar"
              onClick={handleClick}
              sx={{ color: isFavorited ? 'red' : 'default' }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
}
