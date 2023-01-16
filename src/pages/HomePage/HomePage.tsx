import { Divider, Grid, Slide, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { CreateRoadmap } from "../../components/Roadmaps/CreateRoadmap/CreateRoadmap";
import { RecentRoadmaps } from "../../components/Roadmaps/RecentRoadmaps/RecentRoadmaps";
import LandingImage from "./../../images/background.jpg";
import "./HomePage.css";
import { Routes } from "../../service/config";
import { sampleTasks } from "../../service/sampleTasks";

export const HomePage = () => {
  const setData = [
    {
      name: "Machine Learning Basics",
      createdBy: "ML, AI",
      createdAt: "2022-06-24T03:55:16.121Z",
      id: "0",
      tasks: sampleTasks,
    },
  ];
  localStorage.setItem("boards", JSON.stringify(setData));
  // const isJoin = useRouteMatch(Routes.join);
  const isExplore = useRouteMatch(Routes.explore);
  const isCreate = useRouteMatch(Routes.create);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <div className="HomePageContainer">
        {isExplore ? (
          <RecentRoadmaps />
        ) : isCreate ? (
          <CreateRoadmap />
        ) :  (
          <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
            <Grid container item sm={12} lg={9} justify="center" alignItems="center" spacing={3}>
              <Grid item sm={12} lg={6}>
                <Slide direction="down" in={true} timeout={1000}>
                  <div className="HomePageContainer">
                    <Typography variant="h5"></Typography>
                    <img
                      alt="React Northstar App"
                      style={{ height: "400px", width: "500px", transform: isSmallScreen ? "scale(0.5)" : "none" }}
                      src={LandingImage}
                    ></img>
                    <Typography variant="subtitle1">Create custom roadmaps and publish for fellow learners</Typography>
                  </div>
                </Slide>
              </Grid>
              <Grid item sm={12} lg={6}>
                <div className="HomePageContainer">{isExplore ? <RecentRoadmaps /> : <CreateRoadmap />}</div>
              </Grid>
            </Grid>
            {/* <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>

        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <RecentBoards />
              </div>
            </Slide>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <Typography variant='subtitle1'>
                  Here are your recent roadmaps, click on the name to view the details.
                </Typography>
              </div>
            </Slide>
          </Grid>
        </Grid> */}
            <Grid container item sm={12} lg={9} justify="center" alignItems="center" spacing={3}>
              <Grid item sm={12} lg={6}>
                <Slide in={true} direction="up" timeout={2000}>
                  <Divider variant="middle"></Divider>
                </Slide>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
