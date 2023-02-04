import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
const portableDevice = require('./../assets/portableDevice.jpg');

function MobileApps() {

    const isBigScreen = useMediaQuery('(min-width:600px)');

    return (
        <Box style={{ paddingLeft: isBigScreen ? '10%' : '5%', paddingRight: isBigScreen ? '10%' : '5%', marginTop: '80px', marginBottom: '80px' }}>
            <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={isBigScreen ? 8 : 12}>
                    <Typography variant={isBigScreen ? "h3" : "h4"} fontWeight={700} style={isBigScreen ? {} : { textAlign: 'center' }}>
                        Available for your Android or IOS devices
                    </Typography>
                    <Typography style={isBigScreen ? {} : { textAlign: 'justify' }}>
                        <br />Our platform is designed to be accessible from smartphones and tablets.
                        This means that you can access all the features and functionality of our platform from the
                        convenience of your mobile device.
                        To access our platform from your smartphone or tablet, simply download the app from the below.
                        Once you have the app installed, signup and log in with your account details and
                        you'll be able to access all the features of our platform
                    </Typography>
                </Grid>
                <Grid item xs={isBigScreen ? 4 : 12}>
                    <img src={portableDevice} alt="students" width='100%' />
                </Grid>
            </Grid>
        </Box>
    );
}

export default MobileApps;