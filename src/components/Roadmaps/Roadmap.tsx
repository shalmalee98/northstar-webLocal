import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getBoard, updateBoard } from "../../service/roadmaps";
import { Roadmap } from "../../types/roadmap";
import { BoardArea } from "./BoardArea/BoardArea";
import "./Roadmap.css";
import { apiLink } from "../../default";

export const RoadmapComponent = (props) => {
  let { id } = useParams<{ id: string }>();
  let token = localStorage.getItem("userToken");

  const history = useNavigate();
  // var str = history.location.pathname.substring(1, history.location.pathname.length);

  // const [loading, setIsLoading] = useState(true);
  const [result, setResult] = useState({});
  const location = useLocation();

  const fetchBoardData = async (id, signal) => {
    try {
      const response = await fetch(`${apiLink}/roadmap/info/${id}`, {
        method: "GET",
        signal,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (!signal.aborted) {
        return json;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData(id: string | undefined) {
      fetchBoardData(id, abortController.signal);
    }

    fetchData(id);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <BoardArea boardId={id} inLearningList={props.inLearningList} />
    </>
  );
};

export default Roadmap;
