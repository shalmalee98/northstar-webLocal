import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  Slide,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./Tool_bar.css";
import SearchHome from "../../pages/HomePage/SearchHome";
const LogoImage = require("./../../images/icon.png");
const userIcon = require("../../assets/icons/user.png");
const kidIcon = require("../../assets/icons/kid.png");

export const title = "Alasia";

const Alert = React.forwardRef(function Alert(props, ref) {
  const ref_var = React.useRef<HTMLDivElement>(null);
  return <MuiAlert elevation={6} ref={ref_var} variant="filled" {...props} />;
});

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export const Tool_bar = (props: Props) => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleClick = () => {
    setAlertOpen(true);
  };

  const [user, loading, error] = useAuthState(auth);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [kids, setKids] = useState<String>();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const history = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const userEmail = localStorage.getItem("token")?.replace('"', "");
  const settings = ["My Profile", "Switch Profile", "Clear Profile", "Sign Out"];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  const navItems = [
    { id: 0, title: "Home", to: "/" },
    { id: 1, title: "Explore", to: "/explore" },
    { id: 2, title: "My Learnings", to: "/learning" },
  ];
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    if (setting == "Sign Out") logout();
    else if (setting == "Switch Profile") handleModalOpen();
    else if (setting == "Clear Profile") localStorage.removeItem("userProfile");
    else if (setting == "My Profile") history("/userProfile");
  };

  function handleUserProfile(profile) {
    localStorage.setItem("userProfile", profile);
    alert("Profile Switched to : " + localStorage.getItem("userProfile"));
    handleClick();
    if (profile == "kids") setKids(profile);
    else if (profile == "user") setKids("");
    handleModalClose();
  }

  const modalStyle = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ my: 2 }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img alt="Northstar Logo" style={{ height: "40px", width: "40px" }} src={LogoImage}></img>
          Alasia
        </Typography>
      </Box>
      <Divider />
      {/* <List>
        {navItems.map((item, key) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                history.push(`${item.to}`);
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  useEffect(() => {
    if (localStorage.getItem("userProfile") == "kids") setKids("Kids");
    if (loading) return;
    // if (user) return history.push("/"); //problem :p
  }, [user, kids]);

  return (
    <>
      <Slide direction="down" in={true} timeout={800}>
        <AppBar component="nav" style={{ background: "#fff", color: "black" }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            >
              <div
                onClick={() => history("/")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img alt="Alasia Logo" style={{ height: "40px", width: "40px" }} src={LogoImage}></img>
                Alasia &nbsp;<h6>{kids}</h6>
              </div>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <SearchHome />
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={userIcon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <div onClick={() => handleMenuItemClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Menu>
            {/* </Box> */}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={modalStyle}>
              <Box
                style={{
                  width: "100%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  paddingTop: "0%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h4">Choose Profile</Typography>
                </Box>
                <Box style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}>
                  <Card sx={{ width: 200, margin: "5%" }} onClick={() => handleUserProfile("kids")}>
                    <CardActionArea>
                      <CardMedia component="img" height="150" image={kidIcon} alt="kid icon" />
                      <CardContent style={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          Kids
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card sx={{ width: 200, margin: "5%" }} onClick={() => handleUserProfile("user")}>
                    <CardActionArea>
                      <CardMedia component="img" height="150" image={userIcon} alt="user icon" />
                      <CardContent style={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          User
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};
