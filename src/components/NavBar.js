import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import BlurLinear from '@mui/icons-material/BlurLinear';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
        mb: 0.7,
        boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          component={Link}
          to="/"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            color: '#f0f0f0',
          }}
        >
          Home
        </Typography>
        <Button
          color="inherit"
          onClick={handleMenuOpen}
          startIcon={<MenuIcon />}
          sx={{
            backgroundColor: '#ffffff33',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#ffffff55',
            },
          }}
        >
          Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              backgroundColor: '#3f51b5',
              color: '#fff',
            },
          }}
        >
          <MenuItem
            component={Link}
            to="/SBR"
            onClick={handleMenuClose}
            sx={{
              '&:hover': {
                backgroundColor: '#2196f3',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <BlurLinear fontSize="small" />
            </ListItemIcon>
            SBR
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;