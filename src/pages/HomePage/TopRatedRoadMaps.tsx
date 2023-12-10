import { Box, Grid, Grow, Typography, Slide, useMediaQuery, useTheme, Button } from "@mui/material";

import Spinners from "../../components/Spinners/Spinners";
import CardArea from "../../components/Card/CardArea";
import { useNavigate } from "react-router-dom";
import "./TopRatedRoadMaps.css";

const TopRatedRoadMaps = (props) => {
  const history = useNavigate();
  const isBigScreen = useMediaQuery("(min-width: 600px)");

  const isEmptyRecentBoards = (): boolean => {
    if (!props.topRatedData) {
      return true;
    }
    if (props.topRatedData && props.topRatedData.length === 0) {
      return true;
    }
    return false;
  };

  const openRoadmap = (board) => {
    history("/boards/" + `${board.uid}`, board);
  };

  const filteredData = props.topRatedData?.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(props.input);
    }
  });

  return (
    <Box style={{ paddingBottom: "5%", paddingTop: "0%" }}>
      <Grid container spacing={0} style={{ display: "flex" }}>
        <Grid item xs={isBigScreen ? 12 : 12}>
          <Grow style={{ paddingTop: "20px", minHeight: "300px" }} in={true} timeout={1000}>
            <div>
              {isEmptyRecentBoards() && <Spinners />}
              {props.topRatedData && props.topRatedData.length > 0 && (
                <div className="outer-card-cont">
                  {filteredData
                    ?.slice(0, 4)
                    .map((recentBoard) => (
                      <CardArea roadmap={recentBoard} key={recentBoard.uid} inLearningList={false} />
                    ))}
                  {/* <Carousel showDots={false} responsive={responsive} >
                                       
                                    </Carousel> */}
                </div>
              )}
            </div>
          </Grow>
        </Grid>
      </Grid>
    </Box>
  );
};
export default TopRatedRoadMaps;
