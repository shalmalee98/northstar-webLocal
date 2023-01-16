import { Divider, Grid, Slide, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { CreateRoadmap } from '../../components/Roadmaps/CreateRoadmap/CreateRoadmap';
import { RecentRoadmaps } from '../../components/Roadmaps/RecentRoadmaps/RecentRoadmaps';
import LandingImage from './../../images/background.jpg';
import './LoginPage/LoginPage.css';
import { Routes } from '../../service/config';
import { sampleTasks } from '../../service/sampleTasks';

export const RegisterPage = () => {
    const setData = [{
        "name": "Machine Learning Basidfdfcs",
        "createdBy": "ML, AI",
        "createdAt": "2022-06-24T03:55:16.121Z",
        "id": "0",
        "tasks": sampleTasks
    }]
    localStorage.setItem("boards", JSON.stringify(setData));
    const isJoin = useRouteMatch(Routes.join);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    {/* Stuff between this shit */}
                    <Grid item sm={12} lg={6}>
                        <div className='HomePageContainer'>{isJoin ? <RecentRoadmaps /> : <CreateRoadmap />}</div>
                    </Grid>
                    {/* Stuff between this shit */}
                </Grid>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    <Grid item sm={12} lg={6}>
                        <Slide in={true} direction='up' timeout={1000}>
                            <Divider variant='middle'></Divider>
                        </Slide>
                    </Grid>
                </Grid>
                <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
                    <Grid item sm={12} lg={6}>
                        <Slide in={true} direction='up' timeout={2000}>
                            <Divider variant='middle'></Divider>
                        </Slide>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default RegisterPage;
