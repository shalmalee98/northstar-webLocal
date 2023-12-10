import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import HomeImage from "./../../images/background.jpg";
import { CreateRoadmap } from "../../components/Roadmaps/CreateRoadmap/CreateRoadmap";

const HeroHomepage = () => {
  const isBigScreen = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      style={{
        paddingLeft: isBigScreen ? "10%" : "5%",
        paddingRight: isBigScreen ? "10%" : "5%",
        paddingBottom: "5%",
        paddingTop: "0%",
        marginTop: "80px",
      }}
    >
      <Grid container spacing={0} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Grid
          item={true}
          xs={isBigScreen ? 5 : 12}
          style={{ display: "flex", justifyContent: isBigScreen ? "" : "center" }}
        >
          <img src={HomeImage} alt="HomeImage" width="80%" object-fit="cover" />
        </Grid>
        {/* xs on avalble on flex */}
        <Grid item={true} xs={isBigScreen ? 7 : 12}>
          <Typography
            variant={isBigScreen ? "h3" : "h4"}
            fontWeight={700}
            style={isBigScreen ? {} : { textAlign: "center" }}
          >
            Get Started!
          </Typography>
          <Typography style={{ textAlign: "justify" }}>
            <br />
            Our test platform provides users to exchange their knowledge and skills regarding the best ways to learn and
            read scientific papers. Where to start and how to start learning a new topic are two problems that new
            students to a discipline face. New learners can get off to an easy start thanks to the experts offering
            their learning maps (each will have a somewhat different viewpoint). By exchanging, giving likes, and
            building new roadmaps, we create a space where all learners can profit from the advice of the experts.
          </Typography>

          <CreateRoadmap />
        </Grid>
      </Grid>
    </Box>
  );
};
export default HeroHomepage;
