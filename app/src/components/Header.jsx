import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('jwtToken');
  const settings = token == null 
    ? ['Login', 'Cadastro', 'Cadastrar evento', 'Favoritos'] 
    : ['Cadastrar evento', 'Favoritos', 'Logout'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (page) => {
    handleCloseNavMenu();
    if (page === 'Login') {
      navigate('/login');
    } else if (page === 'Favoritos') {
      navigate('/favorites');
    } else if (page === 'Admin') {
      navigate('/admin');
    } else if (page === 'Perfil') {
      navigate('/perfil');
    } else if (page === 'Cadastro') {
      navigate('/cadastro');
    } else if (page === 'Cadastrar evento') {
      navigate('/create-event');
    } else if (page === 'Logout') {
      logout()
      navigate('/');
    }
  };

  return (
    <AppBar position="static" sx={{width: '100%'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component='img'
            src='/assets/UNAS.png'
            alt='logo'
            sx={{width: 75, height: 75, margin: 1, mr: 2}}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 70,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HelipaCultural
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {settings.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuItemClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size= 'large'
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {settings.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;