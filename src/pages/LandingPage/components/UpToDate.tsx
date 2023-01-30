import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
const students = require('../assets/students.jpg');

function UpToDate() {

    const isBigScreen = useMediaQuery('(min-width:600px)');

    return (
        <Box sx={{ paddingX: '10%' }}>
            <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={isBigScreen ? 6 : 12}>
                    <Typography variant={isBigScreen ? "h3" : "h4"} fontWeight={700} style={isBigScreen ? {} : { textAlign: 'center' }} >
                        Staying up-to-date with the latest research
                    </Typography>
                    <Typography style={isBigScreen ? {} : { textAlign: 'justify' }} >
                        <br />With our user-friendly interface, you can easily search
                        and access the latest research in your field of study.
                        Our advanced search filters allow you to narrow down your
                        results by keywords, authors, and publication date.
                    </Typography>
                </Grid>
                <Grid item xs={isBigScreen ? 6 : 12}>
                    <img src={students} alt="students" width='100%' />
                </Grid>
            </Grid>
        </Box>
    );
}

export default UpToDate;