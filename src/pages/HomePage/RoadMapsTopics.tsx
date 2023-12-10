import { useState, useEffect } from "react";
import { Box, Grid, Grow, Typography, Slide, useMediaQuery, useTheme, Button } from "@mui/material";
import { Roadmap } from "../../types/roadmap";
import { getIllustration, getBackground } from "../../utils";
import Spinners from "../../components/Spinners/Spinners";
import CardTopic from "../../components/Card/CardTopic";
import { useNavigate } from "react-router-dom";
import { apiLink } from "../../default";
import { responsive } from "./data.js";
import Carousel from "react-multi-carousel";
import "./TopRatedRoadMaps.css";

const RoadMapsTopics = (props) => {
  const [recentBoards, setRecentBoards] = useState<Roadmap[] | undefined>(undefined);
  const history = useNavigate();
  const isBigScreen = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    async function fetchData() {
      try {
        let token = localStorage.getItem("userToken");
        const response = await fetch(`${apiLink}/concepts/all/`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
            // 'token': `${token}`
          },
        });
        const json = await response.json();
        setRecentBoards(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const isEmptyRecentBoards = (): boolean => {
    if (!recentBoards) {
      return true;
    }
    if (recentBoards && recentBoards.length === 0) {
      return true;
    }
    return false;
  };

  const filteredData = recentBoards?.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(props.input);
    }
  });

  const openRoadmap = (board) => {
    history("/boards/" + `${board.uid}`, board);
  };

  return (
    <Box style={{ paddingBottom: "5%", paddingTop: "0%" }}>
      <Grid container spacing={0} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Grid item xs={isBigScreen ? 12 : 12}>
          {/* <Typography variant={isBigScreen ? "h4" : "h5"} fontWeight={700} style={isBigScreen ? {} : { textAlign: 'center' }} >
                        By Topics
                    </Typography> */}
          <Grow style={{ paddingTop: "20px", minHeight: "300px" }} in={true} timeout={1000}>
            <div>
              {isEmptyRecentBoards() && <Spinners />}
              {recentBoards && recentBoards.length > 0 && (
                <div className="outer-card-cont">
                  {filteredData?.slice(0, 20).map((topic) => <CardTopic topic={topic} key={topic.uid} />)}
                  {/* <Carousel showDots={true} responsive={responsive}>
                   
                  </Carousel> */}
                </div>
              )}
            </div>
          </Grow>
          {/* <Button
            variant="contained"
            sx={{ width: "200px", fontSize: "16px", marginTop: "20px" }}
            onClick={() => {
              history.push("/explore");
            }}
          >
            Explore More
          </Button> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default RoadMapsTopics;
