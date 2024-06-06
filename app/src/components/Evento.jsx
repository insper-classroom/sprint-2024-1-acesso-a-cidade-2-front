import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

export default function Evento({info, onImageClick, onFavoriteClick}) {
return (
    <Box sx={{padding: 1}}>
        <Card sx={{ maxWidth: 550, borderRadius: 5 }}>
            <CardActionArea onClick={() => onImageClick(info)}>
            {/* <CardActionArea> */}
            {info.image ? (
                <CardMedia
                component="img"
                height="150"
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
            <Tooltip title='Favoritar'>  
                <IconButton aria-label="favoritar">
                    <FavoriteIcon />
                </IconButton>
            </Tooltip>  
            </CardActions>
        </Card>
    </Box>
);
}