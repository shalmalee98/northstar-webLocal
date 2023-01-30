import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import { Footer } from '../../../components/Footer/Footer';
import ContactUs from './ContactUs';
import Hero from './Hero';
import Section from './Section';
import Slider from './Slider';
import MobileApps from './MobileApps';
import UpToDate from './UpToDate';
import SignUpBrand from './SignUpBrand';
const LogoImage = require('./../../../images/icon.png');

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{ id: 0, title: 'Login', to: '/Login' }, { id: 1, title: 'SignUp', to: '/Register' }];

function LandingPage(props: Props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ my: 2 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <img
            alt='Northstar Logo'
            style={{ height: '40px', width: '40px' }}
            src={LogoImage}
          ></img>
          Northstar
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item, key) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => history.push(`${item.to}`)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
        contrastText: '#fff'
      },
      action: {
        active: '#000000',
        hover: '#000000',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
        contrastText: '#fff',
      },
    },
  });

  const container = window !== undefined ? () => window().document.body : undefined;
  const history = useHistory();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <AppBar component="nav" style={{ background: '#fff', color: 'black' }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <img
                alt='Northstar Logo'
                style={{ height: '40px', width: '40px' }}
                src={LogoImage}
              ></img>
              Northstar
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, key) => (
                <Button variant='outlined' key={item.title} onClick={() => { history.push(item.to) }} sx={{ color: '#000000', borderColor: 'black', marginX: '10px' }}>
                  {item.title}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Hero />
          <Section />
          <UpToDate />
          <SignUpBrand />
          <MobileApps />
          <Slider />
          {/* <ContactUs /> Not required as per requirement */}
          <Footer />
        </Box>
      </ThemeProvider>
    </Box >
  );
}
export default LandingPage;