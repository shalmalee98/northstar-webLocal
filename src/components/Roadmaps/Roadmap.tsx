import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getBoard, updateBoard } from "../../service/roadmaps";
import { Roadmap } from "../../types/roadmap";
import { BoardArea } from "./BoardArea/BoardArea";
import "./Roadmap.css";

export const RoadmapComponent = (props) => {
  let { id } = useParams<{ id: string }>();

  const history = useHistory();
  var str = history.location.pathname.substring(1, history.location.pathname.length);
  var n = str.indexOf("/") + 1;

  const fetchBoardData = async (id) => {
    try {
      const response = await fetch(`https://p9m3dl.deta.dev/roadmap/info${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData(id: string) {
      fetchBoardData(id);
    }
    fetchData(id);
  }, []);

  return (
    <>
      <BoardArea boardId={id} />
    </>
  );
};

export default Roadmap;
