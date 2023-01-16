import { Roadmap } from "../types/roadmap";
const boardsStoreName = "boards";

export const addBoardToStore = (boardId: string, data: any) => {
  let boards: Roadmap[] = [];

  const store = getFromStore(boardsStoreName);
  if (store) {
    boards = store;
  }
  boards.push(data);
  updateStore(boardsStoreName, boards);

  return true;
};

export const getBoardFromStore = (id: string): Roadmap | undefined => {
  let boards: Roadmap[] = [];

  const store = getFromStore(boardsStoreName);
  if (store) {
    boards = store;
    return boards.find((board) => board.uid === id);
  }
  return undefined;
};

export const getBoardsFromStore = (): Roadmap[] => {
  let boards: Roadmap[] = [];

  const store = getFromStore(boardsStoreName);
  if (store) {
    boards = store;
  }
  return boards;
};

export const updateBoardDataInStore = (boardId: string, data: any): boolean => {
  const boards = getBoardsFromStore();
  const filteredBoards = boards.filter((board) => board.uid !== boardId);
  const newBoards = [...filteredBoards, data];
  updateStore(boardsStoreName, newBoards);
  return true;
};

const getFromStore = (storeName: string) => {
  const store = localStorage.getItem(storeName);
  if (store) {
    return JSON.parse(store);
  }
  return store;
};

const updateStore = (storeName: string, data: any) => {
  localStorage.setItem(storeName, JSON.stringify(data));
};
