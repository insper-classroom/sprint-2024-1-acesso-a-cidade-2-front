import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

export default function Evento() {
return (
    <Box sx={{padding: 1}}>
        <Card sx={{ maxWidth: 345}}>
            <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image="https://imgs.search.brave.com/3DOBUFp5zucDaUuJ9uwiS7bX6Be_bYLiLlRxbty2u80/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cGV0ei5jb20uYnIv/YmxvZy8vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDgvbGFn/YXJ0b3MtZGUtZXN0/aW1hY2FvLmpwZw"
                alt="evento"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
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