import { Grid, Typography, Box, Button, useMediaQuery } from '@mui/material';
import { useHistory } from "react-router-dom";

function SignUpBrand() {

    const history = useHistory();
    const isBigScreen = useMediaQuery('(min-width:600px)');

    return (
        <Box sx={{ paddingX: isBigScreen ? '10%' : '5%', marginY: '80px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h5' style={isBigScreen ? {} : { textAlign: 'center' }}>
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
    );
}

export default SignUpBrand;