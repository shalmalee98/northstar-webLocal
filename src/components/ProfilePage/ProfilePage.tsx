import { Box, Toolbar } from '@material-ui/core';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
const kidIcon = require("../../assets/icons/kid.png");
const userIcon = require("../../assets/icons/user.png");

function ProfilePage() {

    const history = useHistory();

    function handleUserProfile(profile) {
        alert(profile);
        localStorage.setItem("userProfile", profile);
        alert(localStorage.getItem("userProfile"));
        window.location.reload();
    }
    return (
        <Box style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Toolbar />
            <Box>
                <Typography variant='h4'>Choose Profile</Typography>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
                <Card sx={{ width: 200, margin: '5%' }} onClick={() => handleUserProfile("kids")}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="150"
                            image={kidIcon}
                            alt="kid icon"
                        />
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Kids
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ width: 200, margin: '5%' }} onClick={() => handleUserProfile("user")}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="150"
                            image={userIcon}
                            alt="user icon"
                        />
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                User
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box >
    )
}
export default ProfilePage;