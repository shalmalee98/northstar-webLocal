import { Divider } from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";
import React from "react";
import { Paper } from "../../../types/roadmap";

import { Status } from "../../../types/status";
import { useNavigate } from "react-router-dom";
import "./PaperCard.css";
import { DiagnosticCategory } from "typescript";
import { ViewPdf } from "../ViewPdf/ViewPdf";
import { Document, Page } from "react-pdf";
import { Button, Slide, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { apiLink } from "../../../default";

export interface TaskCardProps {
  task: Paper;
  boardId: string;
}

export const PaperCard: React.FC<TaskCardProps> = ({ boardId, task }) => {
  const history = useNavigate();
  if (!task) {
    return null;
  }

  const deleteTask = async (paperId, boardId) => {
    const response = await axios.delete(`${apiLink}/paper/${paperId}`);
    try {
      if (response.status === 200) {
        console.log(` You have created: ${JSON.stringify(response.data)}`);
        window.location.reload();
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("An error has occurred");
    }
  };
  return (
    <Button
      className="TaskCard"
      style={{
        borderLeft: `3px solid ${getCardBorderColor(task.level)}`,
        display: "block",
      }}
    >
      <div
        onClick={() => {
          history(`/paper/${task.id}`);
        }}
      >
        {" "}
        {task.title}
        <button
          className="TaskDeleteButton"
          title="Delete paper"
          onClick={() => {
            deleteTask(task.id, boardId);
            history(0);
          }}
        >
          <DeleteForeverOutlined></DeleteForeverOutlined>
        </button>
      </div>
      <div className="TaskCardHeader"></div>
      {/* <br></br>
      <Divider variant="middle"></Divider> */}
      <div
        onClick={() => {
          history(`/paper/${task.id}`);
        }}
        className="TaskCardContent"
        title={task.description}
      >
        {task.description}
      </div>
    </Button>
  );
};

const getCardBorderColor = (stat) => {
  switch (stat) {
    case "1":
      return "red";
    case "2":
      return "cornflowerblue";
    case "3":
      return "limegreen";
    default:
      return "red";
  }
};
