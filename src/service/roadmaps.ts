import { ulid } from "ulid";
import {
  addBoardToStore,
  getBoardFromStore,
  getBoardsFromStore,
  updateBoardDataInStore,
} from "../repository/boardsStore";
import { Roadmap, NewRoadmap } from "../types/roadmap";
import { Status } from "../types/status";
import { sampleTasks } from "./sampleTasks";
export const addNewBoard = async (newBoard: NewRoadmap): Promise<string> => {
  const user = {
    name: newBoard.author,
    id: ulid(),
    status: Status.NotStarted,
  };
  const boardData: Roadmap = {
    ...newBoard,
    uid: ulid(),
    author: "Jinjun Xiong",
    levels: 3,
    name: "Deep Learning Evolution",
    public: true,
    rating: 3,
    tags: ["basics", "deep learning"],
    // status: "active",
    // createdBy: "Jinjun Xiong",
    tasks: sampleTasks,
    // createdById: user.id,
    // status: Status.Started,
  };
  addBoardToStore(boardData.uid, boardData);

  return boardData.uid;
};

export const getBoards = () => {
  return getBoardsFromStore();
};
export const getBoard = (id: string) => {
  return getBoardFromStore(id);
};

export const updateBoard = (boardId: string, updatedBoard: any): boolean => {
  updateBoardDataInStore(boardId, updatedBoard);
  return true;
};
