import { Box, Grid, Grow, useMediaQuery, Button } from "@mui/material";

import Spinners from "../../components/Spinners/Spinners";
import CardAuthor from "../../components/Card/CardAuthor";
import "./TopRatedRoadMaps.css";

const RoadMapsByAuthors = (props) => {
  const isBigScreen = useMediaQuery("(min-width: 600px)");

  const isEmptyRecentBoards = (): boolean => {
    if (!props.authorData) {
      return true;
    }
    if (props.authorData && props.authorData === 0) {
      return true;
    }
    return false;
  };

  const filteredData = props.authorData.filter((el) => {
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
          <Grow style={{ paddingTop: "20px", minHeight: "300px" }} in={true} timeout={1000}>
            <div>
              {isEmptyRecentBoards() && <Spinners />}
              {props.authorData && props.authorData.length > 0 && (
                <div className="outer-card-cont">
                  {filteredData.slice(0, 20).map((item) => (
                    <CardAuthor item={item} key={item.uid} />
                  ))}
                </div>
              )}
            </div>
          </Grow>
        </Grid>
      </Grid>
    </Box>
  );
};
export default RoadMapsByAuthors;
