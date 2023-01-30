import { Grid, Slide, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Footer } from '../../components/Footer/Footer';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import { Routes } from '../../service/config';
import { useHistory } from 'react-router-dom';
import RegisterBlock from '../../components/RegisterBlock/RegisterBlock';
const LogoImage = require('./../../images/icon.png');

function RegisterPage() {

    const history = useHistory();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery('(min-width:600px)');
    const title = 'Northstar';

    return (
        <>
            <Slide direction='down' in={true} timeout={800}>
                <AppBar position='sticky' className='AppBar' color='inherit'>
                    <AppToolbar>
                        <div className='HeaderContainer' style={{ padding: '25px', display: 'flex' }}>
                            <div className='HeaderLeftContainer' onClick={() => history.push(Routes.home)}>
                                <img
                                    alt='React Northstar App'
                                    style={{ height: '40px', width: '40px', transform: isSmallScreen ? 'scale(0.5)' : 'none' }}
                                    src={LogoImage}
                                ></img>
                                <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} color='inherit' noWrap>
                                    {title}
                                </Typography>
                            </div>
                            <div></div>
                        </div>
                    </AppToolbar>
                </AppBar>
            </Slide>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    <Grid item sm={12} lg={6}>
                        <div className='HomePageContainer' style={{ padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <RegisterBlock />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default RegisterPage;
