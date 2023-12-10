import { Button, Fade, Typography, Grow } from "@mui/material";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddPaper } from "../AddPaper/AddPaper";
import { PaperCard } from "../TaskCard/PaperCard";

export const NewPaper = (props) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [board, setBoard] = useState(props.history.location.state.board);
  const [boardId, setBoardId] = useState(props.history.location.state.newBoardId);
  const [columns, setColumns] = useState([]);

  const data = {
    columns: columns,
  };
  const isEmptyBoard = (): boolean => {
    if (!board) {
      return true;
    }
    if (board && Object.keys(board).length === 0) {
      return true;
    }
    return false;
  };

  const renderCard = ({ content }, { removeCard, dragging }) => (
    <>
      <PaperCard boardId={board.id} task={content}></PaperCard>
    </>
  );

  return (
    <>
      {board && Object.keys(board).length > 0 && (
        <>
          <>
            <div className="BoardAreaHeader">
              <div className="BoardAreaHeaderContainer">
                <h3 className="name">{board.name}</h3>
                <Button startIcon={<AddCircleOutlineIcon />} color="primary" onClick={() => setShowAddTask(true)}>
                  Add Paper
                </Button>
              </div>
            </div>
            <Fade in={true} timeout={2000}>
              <div>
                {isEmptyBoard() && <Typography variant="body2">No papers found</Typography>}
                {/* <ReactBoard initialBoard={data} renderCard={renderCard}></ReactBoard> */}
              </div>
            </Fade>
          </>

          {/* {showAddTask && <AddPaper show={showAddTask} onClose={() => setShowAddTask(false)} boardId={boardId} level={1}></AddPaper>} */}
          {/* {showAddTask && <AddPaper boardId={boardId} level={1} refreshOnSuccess={ }></AddPaper>} */}
          <div className="Footer"></div>
        </>
      )}
    </>
  );
};
