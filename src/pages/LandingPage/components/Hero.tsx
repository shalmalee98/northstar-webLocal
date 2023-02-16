import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
const onTable = require('./../assets/onTable.jpg');


const Hero = () => {

    const isBigScreen = useMediaQuery('(min-width: 600px)')

    return (
        <Box sx={{ paddingX: isBigScreen ? '10%' : '5%' }}>
            <Grid container spacing={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={isBigScreen ? 5 : 12}>
                    <img src={onTable} alt="onTable" width="100%" object-fit="cover" />
                </Grid>

                <Grid item xs={isBigScreen ? 7 : 12}>
                    <Typography variant={isBigScreen ? "h3" : "h4"} fontWeight={700} style={isBigScreen ? {} : { textAlign: 'center' }} >
                        Destination for Researchers, Students, and Academics
                    </Typography>
                    <Typography style={isBigScreen ? {} : { textAlign: 'justify' }} >
                        <br />
                        Our platform provides users to exchange their knowledge and skills regarding the
                        best ways to learn and read scientific papers. Where to start and how to start
                        learning a new topic are two problems that new students to a discipline face.
                        New learners can get off to an easy start thanks to the experts offering their
                        learning maps (each will have a somewhat different viewpoint). By exchanging,
                        giving likes, and building new roadmaps, we create a space where all learners
                        can profit from the advice of the experts.

                        {/* Welcome to our research paper reading platform! Our platform is designed to
                        provide access to a wide range of research papers from various disciplines
                        and fields. We understand the importance of staying up-to-date with the latest
                        research and discoveries, and our platform is designed to make it easy for you
                        to access and read the most recent research papers. */}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;