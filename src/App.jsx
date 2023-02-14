//import { Button, Grid } from '@mui/material'
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
import React from 'react'
import { NavBar } from './NavBar';
//import { TableProducts } from './TableProducts';
//import { NavBar } from './NavBar';
import { AppRouter } from './routes/AppRouter';

export const App = () => {

    const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div style={{marginBottom : 40}}>
                <NavBar />
                </div>
                {/* <Grid container alignItems="center" justify="center">
                <div style={{width: '100%', marginLeft:70,marginRight:70}}>
                <TableProducts />
                </div>
                </Grid> */}
                <AppRouter />
            </ThemeProvider>
        </>
    )
}