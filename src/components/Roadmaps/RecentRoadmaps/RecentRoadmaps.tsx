import { Grow } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Roadmap } from "../../../types/roadmap";
import "./RecentRoadmaps.css";
import CardArea from "../../Card/CardArea";
import Spinners from "../../Spinners/Spinners";
import { Footer } from "../../Footer/Footer";
import { apiLink } from "../../../default";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const RecentRoadmaps = () => {
  const [recentBoards, setRecentBoards] = useState<Roadmap[] | undefined>(undefined);
  const [pages, setPages] = useState(1);

  async function fetchData(page) {
    try {
      let token = localStorage.getItem("userToken");
      const response = await fetch(`${apiLink}/roadmap/all/?page=${page}&size=10`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log("json", json);
      const result = json.items;
      setRecentBoards(result);
      setPages(json.pages);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePageNavigation(event, value) {
    fetchData(value);
  }

  useEffect(() => {
    fetchData(1);
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

  return (
    <>
      {/* <Toolbar /> */}
      {/* <Toolbar /> */}
      <Grow in={true} timeout={1000} style={{ minHeight: "60vh", display: "flex", flexDirection: "column" }}>
        <div className="ccard">
          {isEmptyRecentBoards() && <Spinners />}
          {recentBoards && recentBoards.length > 0 && (
            <div className="ccardbox">
              {recentBoards.map((recentBoard) => (
                <CardArea roadmap={recentBoard} inLearningList={false} />
              ))}
            </div>
          )}
          <Stack spacing={2} style={{ margin: "80px" }}>
            <Pagination count={pages} variant="outlined" color="primary" onChange={handlePageNavigation} />
          </Stack>
        </div>
      </Grow>
      {/* <Footer /> */}
    </>
  );
};
