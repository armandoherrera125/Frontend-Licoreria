import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShieldIcon from '@mui/icons-material/Shield';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Avatar, Badge, Container } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AdbIcon from '@mui/icons-material/Adb';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { ProductCreate } from './product/ProductCreate';
//import { AlertDialog } from '../Dialog';
//import { Caja } from '../Caja';
const pages = [];

export const NavBar = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const count = 0;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    //console.log('me accione')
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const navigate = useNavigate();
  // const {dispatch} = useContext(AuthContext);

  // const handleLogout = () => {
  //   const action = {
  //     type : types.logout
  //   }
  //   dispatch(action);
  //   localStorage.removeItem('user');
  //   navigate("/login", {
  //     replace: true,
  //   });
  // }
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //     primary: {
  //       main: '#1976d2',
  //     },
  //   },
  // });
  // const { user } = useContext(AuthContext);
  return (
    <>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalGroceryStoreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              style={({ isActive }) => {
                return {
                  display: { xs: 'none', md: 'block' },
                  color: isActive ? "red" : "",
                };
              }}

              to={"/"}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Despensa Jadis 1
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <LocalGroceryStoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Despensa Jadis 1
            </Typography>




            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>
            <Box sx={{
              flexGrow: 0,
              marginRight: 10
            }}>

              <ProductCreate />

            </Box>
            <Box sx={{
              flexGrow: 0,
              marginLeft: 10
            }}>
              {/* <Caja /> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </>
  );
};