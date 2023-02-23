import AppToolbar from "@material-ui/core/Toolbar";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";
import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../service/config";
import { auth, logout } from '../../firebase';
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { AppBar, Box, Typography, Toolbar, Slide, useMediaQuery, useTheme, Button, IconButton, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./Tool_bar.css";
const LogoImage = require('./../../images/icon.png');

export const title = "Northstar";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


export const Tool_bar = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const userEmail = localStorage.getItem("token")?.replace('"', '');

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  const navItems = [{ id: 0, title: 'Create', to: '/create' }, { id: 1, title: 'Explore', to: '/explore' }, { id: 2, title: 'My Learnings', to: '/learning' }, { id: 3, title: 'Sign Out', to: 'SignOut' }];
  const drawerWidth = 240;

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
          style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => { if (item.to === "SignOut") logout(); else history.push(`${item.to}`) }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    if (loading) return;
    if (user) return history.push("/");

  }, [user]);

  return (
    <>
      <Slide direction="down" in={true} timeout={800}>
        <AppBar component="nav" style={{ background: '#fff', color: 'black' }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              < div onClick={() => history.replace("/")} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  alt='Northstar Logo'
                  style={{ height: '40px', width: '40px' }}
                  src={LogoImage}
                ></img>
                Northstar
              </div>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, key) => (
                <Button variant='outlined' key={item.title} onClick={() => { if (item.to === "SignOut") {localStorage.removeItem("userToken"); logout();} else history.push(item.to) }} sx={{ color: '#000000', borderColor: 'black', marginX: '10px' }}>
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
      </Slide>
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
    </>
    // <Slide direction="down" in={true} timeout={800}>
    //   <AppBar position="sticky" className="AppBar" color="inherit">
    //     <AppToolbar>
    //       <div className="HeaderContainer">
    //         <div className="HeaderLeftContainer" onClick={() => history.push("/")}>
    //           {/* <AssignmentTurnedInIcon color='primary' className='HeaderIcon' /> */}
    //           <img
    //             alt="React Northstar App"
    //             style={{ height: "40px", width: "40px", transform: isSmallScreen ? "scale(0.5)" : "none" }}
    //             src={LogoImage}
    //           ></img>
    //           <Typography variant={isSmallScreen ? "subtitle1" : "h5"} color="inherit" noWrap>
    //             {title}
    //           </Typography>
    //         </div>
    //         <div>
    //           <Button
    //             title="New Roadmap"
    //             startIcon={<AddCircleOutlineIcon />}
    //             color="primary"
    //             onClick={() => history.replace("/create")}
    //           >
    //             {!isSmallScreen ? "Create" : null}
    //           </Button>
    //           <Button
    //             startIcon={<MergeTypeOutlinedIcon />}
    //             size={isSmallScreen ? "small" : "large"}
    //             color="primary"
    //             onClick={() => history.push(Routes.explore)}
    //           >
    //             {!isSmallScreen ? "Explore" : null}
    //           </Button>
    //           <Button
    //             startIcon={<MergeTypeOutlinedIcon />}
    //             size={isSmallScreen ? "small" : "large"}
    //             color="primary"
    //             onClick={() => history.push(Routes.learning)}
    //           >
    //             {!isSmallScreen ? "Start Learning" : null}
    //           </Button>
    //           <Button
    //             startIcon={<MergeTypeOutlinedIcon />}
    //             size={isSmallScreen ? 'small' : 'large'}
    //             color='primary'
    //             onClick={() => logout()}
    //           >
    //             {!isSmallScreen ? 'Sign Out' : null}
    //           </Button>
    //         </div>
    //       </div>
    //     </AppToolbar>
    //   </AppBar>
    // </Slide>
  );
};
