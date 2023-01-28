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
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Footer } from '../../components/Footer/Footer';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Hero from './Hero';
import Section from './Section';
import Slider from './Slider';
const LogoImage = require('./../../images/icon.png');
const myteam = require('./myteam.jpg');
const bestTeams = require('./bestTeams.jpg');
const onTable = require('./onTable.jpg');
const students = require('./students.jpg');
const portableDevice = require('./portableDevice.jpg');




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
            <ListItemButton sx={{ textAlign: 'center' }}>
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
          <Box sx={{ paddingX: '10%' }}>
            <Grid container spacing={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={5}>
                <img src={onTable} alt="onTable" width="100%" />
              </Grid>

              <Grid item xs={7}>
                <Typography variant="h3" fontWeight={700}>
                  Destination for Researchers, Students, and Academics
                </Typography>
                <Typography>
                  <br />Welcome to our research paper reading platform! Our platform is designed to
                  provide access to a wide range of research papers from various disciplines
                  and fields. We understand the importance of staying up-to-date with the latest
                  research and discoveries, and our platform is designed to make it easy for you
                  to access and read the most recent research papers.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Section />
          </Box>
          <Box sx={{ paddingX: '10%' }}>
            <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={6}>
                <Typography variant="h3" fontWeight={700}>
                  Staying up-to-date with the latest research
                </Typography>
                <Typography>
                  <br />With our user-friendly interface, you can easily search
                  and access the latest research in your field of study.
                  Our advanced search filters allow you to narrow down your
                  results by keywords, authors, and publication date.
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img src={students} alt="students" width='100%' />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ paddingX: '10%', marginY: '80px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h5'>
              Sign up now and start exploring the world of scholarly research at your fingertips.
            </Typography>
            <Button
              variant="contained"
              sx={{ width: '200px', fontSize: '16px', marginTop: '20px' }}
              onClick={() => { history.push('/Register') }}
            >
              Sign Up
            </Button>
          </Box>
          <Box style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: '80px', marginBottom: '10px' }}>
            <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={8}>
                <Typography variant="h3" fontWeight={700}>
                  Available for your Android or IOS devices
                </Typography>
                <Typography>
                  <br />Our platform is designed to be accessible from smartphones and tablets.
                  This means that you can access all the features and functionality of our platform from the
                  convenience of your mobile device.
                  To access our platform from your smartphone or tablet, simply download the app from the below.
                  Once you have the app installed, signup and log in with your account details and
                  you'll be able to access all the features of our platform
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <img src={portableDevice} alt="students" width='100%' />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Slider />
        <Box style={{ marginTop: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ContactUs />
        </Box>
        <Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Box >
  );
}
export default LandingPage;




// import { Button, Divider, Grid, Slide, Typography, useMediaQuery, useTheme } from "@material-ui/core";
// import React from "react";
// import { useRouteMatch } from "react-router-dom";
// import { Footer } from "../../components/Footer/Footer";
// import { CreateRoadmap } from "../../components/Roadmaps/CreateRoadmap/CreateRoadmap";
// import { RecentRoadmaps } from "../../components/Roadmaps/RecentRoadmaps/RecentRoadmaps";
// // import LandingImage from "./../../images/background.jpg";
// import LandingImage from "./../../images/icon.png";
// import "./../HomePage/HomePage.css";
// import { Routes } from "../../service/config";
// import { sampleTasks } from "../../service/sampleTasks";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";
// import { useHistory } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import AppToolbar from '@material-ui/core/Toolbar';
// import LogoImage from './../../images/icon.png';

// export const LandingPage = () => {
//   const history = useHistory();
//   const setData = [
//     {
//       name: "Machine Learning Basics",
//       createdBy: "ML, AI",
//       createdAt: "2022-06-24T03:55:16.121Z",
//       id: "0",
//       tasks: sampleTasks,
//     },
//   ];
//   localStorage.setItem("boards", JSON.stringify(setData));
//   // const isJoin = useRouteMatch(Routes.join);
//   const isExplore = useRouteMatch(Routes.explore);
//   const isCreate = useRouteMatch(Routes.create);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
//   const title = 'Northstar';

//   return (
//     <>
//       <Slide direction='down' in={true} timeout={800}>
//         <AppBar position='sticky' className='AppBar' color='inherit'>
//           <AppToolbar>
//             <div className='HeaderContainer'>
//               <div className='HeaderLeftContainer' onClick={() => history.push(Routes.home)}>
//                 <img
//                   alt='React Northstar App'
//                   style={{ height: '40px', width: '40px', transform: isSmallScreen ? 'scale(0.5)' : 'none' }}
//                   src={LogoImage}
//                 ></img>
//                 <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} color='inherit' noWrap>
//                   {title}
//                 </Typography>
//               </div>
//               <div></div>
//             </div>
//           </AppToolbar>
//         </AppBar>
//       </Slide>
//       <div className="HomePageContainer">

//         <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
//           <Grid container item sm={12} lg={9} justify="center" alignItems="center" spacing={3}>
//             <Grid item sm={12} lg={6}>
//               <Slide direction="down" in={true} timeout={500}>
//                 <div className="HomePageContainer">
//                   <Typography variant="h5"></Typography>
//                   <img
//                     alt="React Northstar App"
//                     style={{ height: "400px", width: "500px", transform: isSmallScreen ? "scale(0.5)" : "none" }}
//                     src={LandingImage}
//                   ></img>
//                   <Typography variant="subtitle1">Create custom roadmaps and publish for fellow learners</Typography>
//                 </div>
//               </Slide>
//             </Grid>
//             <Grid item sm={12} lg={6}>
//               <Grid item sm={12} lg={6}>
//                 <Slide direction="down" in={true} timeout={500}>
//                   <div className="HomePageContainer">
//                     <Typography variant="h5">NORTHSTAR</Typography>
//                     <Typography variant="subtitle1">Research - Collaborate - Create</Typography>
//                     <Typography variant="subtitle1">Changing the world together</Typography>
//                     <Typography variant="subtitle1">Research directed to the future</Typography>
//                   </div>
//                 </Slide>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
//             <Grid item sm={12} lg={6}>
//               <Slide in={true} direction='up' timeout={500}>
//                 <Divider variant='middle'></Divider>
//               </Slide>
//             </Grid>
//           </Grid>

//           <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
//             <Grid item sm={12} lg={6}>
//               <Slide in={true} direction='up' timeout={500}>
//                 <div className='HomePageContainer'>
//                   <Button
//                     title="Download Apk"
//                     startIcon={<AddCircleOutlineIcon />}
//                     color="primary"
//                     href="https://drive.google.com/file/d/1N-_qeQGRP6mP1-RA0RzXB-pchqBOOS_8/view?usp=share_link"
//                   // onClick={() => history.push(Routes.create)}
//                   >
//                     {!isSmallScreen ? "Download Apk" : null}
//                   </Button>
//                 </div>
//               </Slide>
//             </Grid>
//             {/* <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
//                   <Grid item sm={12} lg={6}>
//                     <Slide in={true} direction='up' timeout={1000}>
//                       <Divider variant='middle'></Divider>
//                     </Slide>
//                   </Grid>
//                 </Grid> */}

//             {/* <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}> */}
//             {/* <Grid item sm={12} lg={6}>
//                 <Slide direction="down" in={true} timeout={1000}>
//                   <div className="HomePageContainer">
//                     <Typography variant="h5">NORTHSTAR</Typography>
//                     <Typography variant="subtitle1">Create custom roadmaps and publish for fellow learners</Typography>
//                     <Typography variant="subtitle1">Research - Collaborate - Create</Typography>
//                     <Typography variant="subtitle1">Changing the world together</Typography>
//                     <Typography variant="subtitle1">Research directed to the future</Typography>
//                   </div>
//                 </Slide>
//               </Grid> */}

//             {/* <Grid item sm={12} lg={6}>
//             <Slide in={true} direction='up' timeout={1500}>
//               <div className='HomePageContainer'>
//                 <Typography variant='subtitle1'>
//                   Here are your recent roadmaps, click on the name to view the details.
//                 </Typography>
//               </div>
//             </Slide>
//           </Grid> */}
//             {/* </Grid> */}

//             {/* <Grid item sm={12} lg={6}>
//             <Slide in={true} direction='up' timeout={1500}>
//               <div className='HomePageContainer'>
//                 <Typography variant='subtitle1'>
//                   Here are your recent roadmaps, click on the name to view the details.
//                 </Typography>
//               </div>
//             </Slide>
//           </Grid> */}
//           </Grid>
//           {/* <Grid container item sm={12} lg={9} justify="center" alignItems="center" spacing={3}>
//                 <Grid item sm={12} lg={6}>
//                   <Slide in={true} direction="up" timeout={2000}>
//                     <Divider variant="middle"></Divider>
//                   </Slide>
//                 </Grid>
//               </Grid> */}
//         </Grid>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LandingPage;
