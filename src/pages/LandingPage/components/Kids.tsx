import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
const kids = require('./../assets/kids.jpg');


const Kids = () => {

    const isBigScreen = useMediaQuery('(min-width: 600px)')

    return (
        <Box sx={{ paddingX: isBigScreen ? '10%' : '5%' }}>
            <Grid container spacing={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={isBigScreen ? 5 : 12}>
                    <img src={kids} alt="kids" width="100%" object-fit="cover" />
                </Grid>

                <Grid item xs={isBigScreen ? 7 : 12}>
                    <Typography variant={isBigScreen ? "h3" : "h4"} fontWeight={700} style={isBigScreen ? {} : { textAlign: 'center' }} >
                        Kids who want to learn and explore.
                    </Typography>
                    <Typography style={isBigScreen ? {} : { textAlign: 'justify' }} >
                        <br />
                        Our platform isn't just for researchers, students, and academics! It's also a great resource for kids.
                        Raodmaps designed to make learning fun and easy. Create a space where all learners, including kids,
                        can benefit from the advice of the experts. We believe that learning should be fun and exciting, and
                        we're here to help you every step of the way. Whether you're interested in science, history, or any
                        other subject, our platform has something for everyone. So why wait? Start exploring and learning today!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Kids;