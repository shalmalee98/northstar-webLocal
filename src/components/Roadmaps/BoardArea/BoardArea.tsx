import { Button, Fade, Typography, Grow } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Roadmap, Paper } from "../../../types/roadmap";
import { AddPaper } from "../../Tasks/AddPaper/AddPaper";
import { PaperCard } from "../../Tasks/TaskCard/PaperCard";
import "./BoardArea.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import ReactBoard, { clickCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { Status } from "../../../types/status";
import useId from "@mui/material/utils/useId";
import { convertToObject, isConstructorDeclaration } from "typescript";
import { DeleteForeverOutlined } from "@material-ui/icons";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { Routes } from "../../../service/config";
import { Card, CardContent, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';

interface BoardAreaProps {
  board: Roadmap;
}
export const BoardArea = (props) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [boardId, setBoardId] = useState(props.boardId);
  const [board, setBoard] = useState<Roadmap | undefined>(undefined);
  const [papers, setPapers] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [cards, setCards] = useState<any>({});
  const [data, setData] = useState<any>({ columns: columns });
  // const [starRating, setStarRating] = React.useState<any | undefined>(0);
  const [hover, setHover] = React.useState(-1);
  const [value, setValue] = React.useState(0);
  const [boardLevels, setBoardLevels] = useState(0);
  const [alert, setAlert] = useState('');
  const [referencedWorks, setReferencedWorks] = useState(Array);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const history = useHistory();
  console.log(boardId)
  console.log(papers)
  console.log("Board:", board)
  console.log("Data:", data)

  const getTasksByStatus = (tasks, status) => {
    if (tasks != undefined) {
      console.log("Tasks: ", tasks)
      const filteredTasks = tasks
        .filter((task) => task.level === status)
        .map((task) => {
          return {
            id: task.uid,
            title: task.name,
            description: task.link,
          };
        });
      return filteredTasks;
    }
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  interface card {
    id: number;
    title: string;
    card: string;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index - 1}`,
      'aria-controls': `simple-tabpanel-${index - 1}`,
    };
  }


  const getPapersdata = async () => {
    try {
      const response = await fetch(`https://33yc57.deta.dev/roadmap/papers${boardId}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      setPapers(json);
      let refWork = Array();
      if (json.length > 0) {
        json.map(paper => {
          paper.referenced_works.map(ref => {
            refWork.push(ref);
          })
        })
        setReferencedWorks(refWork)
        const cols = [
          {
            id: 1,
            title: "Level 1",
            cards: getTasksByStatus(json, "1"),
          },
          {
            id: 2,
            title: "Level 2",
            cards: getTasksByStatus(json, "2"),
          },
          {
            id: 3,
            title: "Level 3",
            cards: getTasksByStatus(json, "3"),
          },
          {
            id: 4,
            title: "Level 4",
            cards: getTasksByStatus(json, "4"),
          },
        ]
        setColumns(cols);
      }
      // let cols = Array();
      // for(let i=1; i<=3;i++){
      //   cols.push({
      //     id: i,
      //     // "level": i,
      //     title: "Level "+i,
      //     cards: getTasksByStatus(json, i),
      //   })
      // }
      // console.log("tab wise separated data: ", cols)
      // setColumns({'columns': cols});

      // setColumns(cols);
      // setData({"columns": cols})
      // }

      return json.roadmap_papers;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBoard = async (boardId) => {
    try {
      const response = await fetch(`https://33yc57.deta.dev/roadmap/info${boardId}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      setBoard(json);
      setBoardLevels(json.levels);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoadmap = async (boardId) => {
    const response = await axios.delete(`https://33yc57.deta.dev/roadmap/${boardId}`);
    try {
      if (response.status === 200) {
        console.log(` You have deleted: ${JSON.stringify(response.data)}`);
        history.push(Routes.explore);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("An error has occurred");
    }
  };

  const isEmptyBoard = (): boolean => {
    if (!board) {
      return true;
    }
    if (papers.length === 0) {
      return true;
    }
    if (board && Object.keys(board).length === 0) {
      return true;
    }
    return false;
  };

  const changeRating = (newRating) => {
    const postData = {
      rating: newRating
    }

    return axios.post(`https://33yc57.deta.dev/roadmap/rating`, postData, { params: { roadmap_id: boardId } })
      .then(response => {
        if (response.status === 200) {
          console.log(` You have modified: ${JSON.stringify(response.data)}`);
          fetchBoard(boardId);
        } else {
          throw new Error("An error has occurred");
        }
      }
      )
  };

  const renderTabs = () => {
    let tabs = Array();
    for (let i = 0; i < boardLevels; i++) {
      tabs.push(<Tab label={`Level ${i + 1}`} {...a11yProps(i + 1)} />)
    }
    return tabs;
  }

  const addToLearningList = (boardId) => {
    const postData = {
      roadmap_id: boardId
    }
    return axios.post(`https://33yc57.deta.dev/user/learning_list`, postData, { params: { user_email: 'jinjun@gmail.com' } })
      .then(response => {
        if (response.status === 200) {
          console.log(` You have modified: ${JSON.stringify(response.data)}`);
          fetchBoard(boardId);
        } else {
          throw new Error("An error has occurred");
        }
      }
      )
  }

  const cloneRoadmap = (boardId) => {
    return axios.post(`https://33yc57.deta.dev/roadmap/clone`, {}, { params: { user_email: 'jinjun@gmail.com', roadmap_id: boardId } })
      .then(response => {
        if (response.status === 200) {
          console.log(` You have modified: ${JSON.stringify(response.data)}`);
          history.push(Routes.explore);
          // fetchBoard(boardId);
        } else {
          throw new Error("An error has occurred");
        }
      }
      )
  }

  const deleteTask = async (paperId) => {
    const response = await axios.delete(`https://33yc57.deta.dev/paper/${paperId}`);
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
  }

  useEffect(() => {
    async function fetchData() {
      fetchBoard(boardId);
      getPapersdata();
    }
    fetchData();
  }, []);

  const renderCard = ({ content }, { removeCard, dragging }) => {
    console.log(content);
    <><PaperCard boardId={boardId} task={content}></PaperCard></>;
  }
  return (
    <>
      {isEmptyBoard() && <Typography variant="body2">No papers found</Typography>}
      {board && Object.keys(board).length > 0 && (
        <><><div className="BoardAreaHeader">
          <div className="BoardAreaHeaderContainer">
            <h3 className="name">{board.name}</h3>
            <Button startIcon={<AddCircleOutlineIcon />} color="primary" onClick={() => setShowAddTask(true)}>
              Add Paper
            </Button>
            <Button startIcon={<DeleteForeverOutlined />} color="primary" onClick={() => deleteRoadmap(boardId)}>
              Delete Roadmap
            </Button>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name="hover-feedback"
                value={board.rating}
                precision={1}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  changeRating(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {board.rating !== null && (
                <Box sx={{ ml: 2 }}></Box>
              )}
            </Box>
            <Button startIcon={<AddCircleOutlineIcon />} color="primary" onClick={() => addToLearningList(boardId)}>
              Add to my learning list
            </Button>
            <Button startIcon={<AddCircleOutlineIcon />} color="primary" onClick={() => cloneRoadmap(boardId)}>
              Clone
            </Button>
          </div>
        </div><Fade in={true} timeout={2000}>
            <div>
              {/* <ReactBoard children={data} 
             renderCard={( content, { removeCard, dragging }) => (
              <PaperCard boardId={boardId} task={content}>
                {content}
                <button type="button" onClick={removeCard}>Remove Card</button>
              </PaperCard>
            )} ></ReactBoard> */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {renderTabs()}
                </Tabs>
              </Box>
              {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {/* {renderTabs()} */}
              {/* {columns.map(col => {
                  return <Tab label={col.title} {...a11yProps(col.id)} />
                })
                } */}

              {/* <Tab label="Level 1" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} /> */}
              {/* </Tabs>
            </Box> */}
              {/* {columns.cols.map(col => {
              <TabPanel value={value} index={value+1} key={col.id}>
                {col.cards.map(card=> 
      //             <Card key={card.id}>
      //               <div onClick={() => {
      //   history.replace(`/paper/${card.id}`, {card, boardId});
      // }} >
      //               <CardContent>
                    <Typography variant="h5" component="div">
                      {card.title}
                      <DeleteIcon onClick={deleteTask}></DeleteIcon>
                      <br/>
                    </Typography>
                  //   <Typography variant="body2">{card.description}</Typography>
                  //   </CardContent>
                  //   </div>
                  // </Card>
                )}
              </TabPanel>
            })} */}
              {/* <TabPanel value={value} index={value+1}>
                {columns.cols[value].cards.map(card => {
                  return (
                  <Card>
                    <div onClick={() => {
        history.replace(`/paper/${card.id}`, {card, boardId});
      }} >
                    <CardContent>
                    <Typography variant="h5" component="div">
                      {card.title}
                      <DeleteIcon onClick={deleteTask}></DeleteIcon>
                      <br/>
                    </Typography>
                    <Typography variant="body2">{card.description}</Typography>
                    </CardContent>
                    </div>
                  </Card>)
                })}
               </TabPanel> */}
              <TabPanel value={value} index={0}>
                {columns[0] ? columns[0].cards.map(card =>
                  <Card key={card.id}>
                    <div onClick={() => {
                      history.replace(`/paper/${card.id}`, { card, boardId });
                    }} >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {card.title}
                          <DeleteIcon onClick={deleteTask}></DeleteIcon>
                          <br />
                        </Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </CardContent>
                    </div>
                  </Card>
                ) : <Typography variant="h5" component="div">
                  No papers found
                </Typography>}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {columns[1] ? columns[1].cards.map(card =>
                  <Card key={card.id}>
                    <div onClick={() => {
                      history.replace(`/paper/${card.id}`, { card, boardId });
                    }} >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {card.title}
                          <DeleteIcon onClick={deleteTask}></DeleteIcon>
                          <br />
                        </Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </CardContent>
                    </div>
                  </Card>
                ) : <Typography variant="h5" component="div">
                  No papers found
                </Typography>}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {columns[2] ? columns[2].cards.map(card =>
                  <Card key={card.id}>
                    <div onClick={() => {
                      history.replace(`/paper/${card.id}`, { card, boardId });
                    }} >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {card.title}
                          <DeleteIcon onClick={deleteTask}></DeleteIcon>
                          <br />
                        </Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </CardContent>
                    </div>
                  </Card>
                ) : <Typography variant="h5" component="div">
                  No papers found
                </Typography>}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {columns[3] ? columns[3].cards.map(card =>
                  <Card key={card.id}>
                    <div onClick={() => {
                      history.replace(`/paper/${card.id}`, { card, boardId });
                    }} >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {card.title}
                          <DeleteIcon onClick={deleteTask}></DeleteIcon>
                          <br />
                        </Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </CardContent>
                    </div>
                  </Card>
                ) : <Typography variant="h5" component="div">
                  No papers found
                </Typography>}
              </TabPanel>
              {/* <Popover
              // id={id}
              open={alert!=""}
              // anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover> */}
            </div>
          </Fade></>
          {showAddTask && <AddPaper show={showAddTask} onClose={() => setShowAddTask(false)} boardId={boardId}></AddPaper>}
          <div className="Footer"></div></>
      )}
    </>
  );
};

export default BoardArea;


