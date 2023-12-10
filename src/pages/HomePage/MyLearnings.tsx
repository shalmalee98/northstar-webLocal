import { useState, useEffect } from "react";
import { Box, Grid, Grow, Typography, Slide, useMediaQuery, useTheme, Button } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Roadmap } from "../../types/roadmap";
import { getIllustration, getBackground } from "../../utils";
import Spinners from "../../components/Spinners/Spinners";
import CardArea from "../../components/Card/CardArea";
import { useNavigate } from "react-router-dom";
import { apiLink } from "../../default";
import "./TopRatedRoadMaps.css";

const MyLearnings = (props) => {
  const [recentBoards, setRecentBoards] = useState<Roadmap[] | undefined>(undefined);
  const history = useNavigate();
  const isBigScreen = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    async function fetchData() {
      try {
        let token = localStorage.getItem("userToken");
        const response = await fetch(`${apiLink}/user/learning_list`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setRecentBoards(result.data.learning_list);
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

  const openRoadmap = (board) => {
    history("/boards/" + `${board.uid}`, board);
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

  return (
    <Box style={{ paddingBottom: "5%", paddingTop: "0%" }}>
      <Grid container spacing={0} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Grid item xs={isBigScreen ? 12 : 12}>
          {/* <Typography variant={isBigScreen ? "h4" : "h5"} fontWeight={700} style={isBigScreen ? {} : { textAlign: 'center' }} >
                        My RoadMaps
                    </Typography> */}
          <Grow style={{ paddingTop: "20px", minHeight: "300px" }} in={true} timeout={1000}>
            <div className="ccard">
              {isEmptyRecentBoards() && <Spinners />}
              {recentBoards && recentBoards.length > 0 && (
                <div className="ccardbox outer-card-cont">
                  {filteredData
                    ?.slice(0, 4)
                    .map((recentBoard) => (
                      <CardArea roadmap={recentBoard} inLearningList={false} key={recentBoard.uid} />
                    ))}
                </div>
              )}
            </div>
          </Grow>
          {/* <Button
            variant="contained"
            sx={{ width: "200px", fontSize: "16px", marginTop: "20px" }}
            onClick={() => {
              history.push("/learning");
            }}
          >
            Explore More
          </Button> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default MyLearnings;
