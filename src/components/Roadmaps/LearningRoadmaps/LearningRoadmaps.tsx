import { Grow } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesPage } from "../../../service/config";
import { Roadmap } from "../../../types/roadmap";
import { apiLink } from "../../../default";
import Spinners from "../../Spinners/Spinners";
import CardArea from "../../Card/CardArea";
import Stack from "@mui/material/Stack";
import { Navigate } from "react-router-dom";
import { Footer } from "../../Footer/Footer";
import "../RecentRoadmaps/RecentRoadmaps.css";

export const LearningRoadmaps = () => {
  const history = useNavigate();
  const [recentBoards, setRecentBoards] = useState<Roadmap[] | undefined>(undefined);

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
      console.log("result", result);
      setRecentBoards(result.data.learning_list);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
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
    // <Navigate to={`${RoutesPage.boards}/${board.uid}`} state={ board: board, inLearningList: true } />;
    // history({  , state: { board: board, inLearningList: true } });
  };

  return (
    <>
      <Toolbar />
      <Toolbar />
      <Grow in={true} timeout={1000} style={{ minHeight: "60vh", display: "flex", flexDirection: "column" }}>
        <div className="ccard">
          {isEmptyRecentBoards() && <Spinners />}
          {recentBoards && recentBoards.length > 0 && (
            <div className="ccardbox">
              {recentBoards.map((recentBoard) => (
                <CardArea roadmap={recentBoard} inLearningList={true} />
              ))}
            </div>
          )}
          <Stack spacing={2} style={{ margin: "80px" }}>
            {/* <Pagination count={3} variant="outlined" color="primary" /> */}
          </Stack>
        </div>
      </Grow>
      <Footer />
    </>
  );
};
