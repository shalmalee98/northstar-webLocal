import React from 'react';
import { useHistory } from "react-router-dom";
import { AppBar, Box, Typography, Toolbar, Button, IconButton, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const LogoImage = require('./../../images/icon.png');


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

function Appbar(props: Props) {

    const history = useHistory();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;
    const navItems = [{ id: 0, title: 'Login', to: '/Login' }, { id: 1, title: 'SignUp', to: '/Register' }];
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
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => history.push(`${item.to}`)}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
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
        </>
    );
}

export default Appbar;