import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material';
import { Footer } from '../../../components/Footer/Footer';
import ContactUs from './ContactUs';
import Hero from './Hero';
import Section from './Section';
import Slider from './Slider';
import MobileApps from './MobileApps';
import UpToDate from './UpToDate';
import SignUpBrand from './SignUpBrand';
import Kids from './Kids';
import Appbar from '../../Appbar/Appbar';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function LandingPage(props: Props) {

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Hero />
          <Section />
          <UpToDate />
          <Kids />
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