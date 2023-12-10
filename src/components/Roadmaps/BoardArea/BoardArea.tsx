import { Typography, Box, useMediaQuery, Button, Fade, TextField, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import { url } from "../../../utils/constants";
import { Roadmap } from "../../../types/roadmap";
import { AddPaper } from "../../Tasks/AddPaper/AddPaper";
import { PaperCard } from "../../Tasks/TaskCard/PaperCard";
import "./BoardArea.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Toolbar from "@mui/material/Toolbar";
import { DeleteForeverOutlined, Edit, Save, PlaylistAdd } from "@mui/icons-material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { RoutesPage } from "../../../service/config";
import { Card, CardContent, Rating, CardMedia, CardActions, CardActionArea } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Popover from "@mui/material/Popover";
import Spinners from "../../Spinners/Spinners";

import { Footer } from "../../Footer/Footer";
import { apiLink } from "../../../default";
import SuggestedRoadmaps from "../SuggestedRoadmaps.tsx/SuggestedRoadmaps";
import { getBackground } from "../../../utils";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import ActionAlerts from "../../Alert/ActionAlerts";
import { uploadThumbnail } from "../../../firebase";
import { getAutoComplete } from "./OAManager";
import { wordFilter } from "../../../service/wordFilter";
const pdfIcon = require("../../../assets/icons/pdf-file-9-128.jpeg");
const tempBG = require("../../../assets/photos/userProfileBG.jpg");

interface BoardAreaProps {
  board: Roadmap;
}
export const BoardArea = (props) => {
  let location = useLocation();
  let { id } = useParams();
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
  const [alert, setAlert] = useState("");
  const [referencedWorks, setReferencedWorks] = useState(Array);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [nameIsEditable, setNameIsEditable] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [userLearningList, setUserLearningList] = useState();
  const [RemoveRoadmap, setRemoveRoadmap] = useState(false);
  const [notify, setNotify] = React.useState({ isOpen: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [uploadPicture, setUploadPicture] = useState(null);
  const isBigScreen = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem("userToken");
  const userEmail = localStorage.getItem("token");
  const [paperEdit, setPaperEdit] = React.useState(false);
  const [paperName, setPaperName] = React.useState("");
  const [paperLink, setPaperLink] = React.useState("");
  const [cardID, setCardID] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const [chipData, setChipData] = React.useState(["Angular", "jQuery", "Polymer", "React", "Vue.js"]);
  const [chipInput, setChipInput] = useState("");

  const handleAddChipInput = (chipInput) => {
    let temp = [...chipData, chipInput];
    setChipData(temp);
    setChipInput("");
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const history = useNavigate();

  const getTasksByStatus = (tasks, status) => {
    if (tasks != undefined) {
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
      "aria-controls": `simple-tabpanel-${index - 1}`,
    };
  }

  const getPapersdata = async (signal) => {
    try {
      const response = await fetch(`${apiLink}/roadmap/papers/${boardId}`, {
        method: "GET",
        signal,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (!signal.aborted) {
        setPapers(json);
        let refWork = Array();
        if (json.length > 0) {
          json.map((paper) => {
            paper.referenced_works.map((ref) => {
              refWork.push(ref);
            });
          });
          setReferencedWorks(refWork);
          const cols = [
            {
              id: 1,
              title: "Level 1",
              cards: getTasksByStatus(json, 1),
            },
            {
              id: 2,
              title: "Level 2",
              cards: getTasksByStatus(json, 2),
            },
            {
              id: 3,
              title: "Level 3",
              cards: getTasksByStatus(json, 3),
            },
          ];
          setColumns(cols);
        }
        return json.roadmap_papers;
      }
    } catch (error) {
      setNotify({ isOpen: true, message: "Unable to fetch paper data", type: "error" });
      console.log(error);
    }
  };

  const fetchBoard = async (boardId, signal) => {
    try {
      const response = await fetch(`${apiLink}/roadmap/info/${boardId}`, {
        signal,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (!signal.aborted) {
        setBoard(json);
        setChipData(Object.values(json.tags));
        setBoardName(json.name);
        setBoardDescription(json.description);
        setBoardLevels(json.levels);
        setThumbnailURL(json.imageURL);
        checkRoadmapOwner(json);
        return json;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLevel = async () => {
    const abortController = new AbortController();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    const postData = { ...board, levels: boardLevels + 1 };
    const response = await axios.put(`${apiLink}/roadmap/?roadmap_id=${boardId}`, postData, {
      params: { roadmap_id: boardId },
      headers,
    });
    try {
      if (response.status === 200) {
        setNotify({ isOpen: true, message: "Level Updated", type: "success" });

        fetchBoard(boardId, abortController.signal);
      } else {
        setNotify({ isOpen: true, message: "Unable to update level", type: "error" });
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setNotify({ isOpen: true, message: "Error occured", type: "error" });
      console.log("An error has occurred");
    }
  };

  const deleteRoadmap = async (boardId) => {
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${apiLink}/roadmap/${boardId}`, { headers });
    try {
      if (response.status === 200) {
        setNotify({ isOpen: true, message: "Roadmap Deleted", type: "success" });
        history(RoutesPage.explore);
      } else {
        setNotify({ isOpen: true, message: "Unable to delete roadmap", type: "error" });
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

  const changeRating = async (newRating) => {
    const abortController = new AbortController();

    const postData = {
      rating: newRating,
    };
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    // console.log(postData);
    await axios
      .post(`${apiLink}/roadmap/rating`, postData, {
        params: { roadmap_id: boardId },
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setNotify({ isOpen: true, message: "Rating Updated", type: "success" });
          fetchBoard(boardId, abortController.signal);
        } else {
          setNotify({ isOpen: true, message: "Error occured while updating rating", type: "error" });
          throw new Error("An error has occurred");
        }
      });
  };

  const renderTabs = () => {
    let tabs = Array();
    let levelNames = ["Beginner", "Intermediate", "Advanced"];
    for (let i = 0; i < boardLevels; i++) {
      tabs.push(<Tab label={levelNames[i]} {...a11yProps(i + 1)} />);
    }
    return tabs;
  };

  const addToLearningList = (boardId) => {
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    return axios
      .post(
        `${apiLink}/user/learning_list`,
        {},
        {
          params: {
            roadmap_id: boardId,
          },
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setNotify({ isOpen: true, message: "Successfully added to your Learning list", type: "success" });
          setRemoveRoadmap(true);
        } else {
          setNotify({ isOpen: true, message: "Error occured while adding to Learning list", type: "error" });
          throw new Error("An error has occurred");
        }
      });
  };

  async function fetchUserLearningList(signal) {
    try {
      let token = localStorage.getItem("userToken");
      const response = await fetch(`${apiLink}/user/learning_list`, {
        method: "GET",
        signal,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!signal.aborted) {
        setUserLearningList(result?.data.learning_list);
        result.data.learning_list.forEach((roadmap) => {
          if (roadmap.uid == boardId) {
            setRemoveRoadmap(true);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromLearningList = (boardId) => {
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    return axios
      .delete(`${apiLink}/user/learning_list`, {
        params: {
          roadmap_id: boardId,
        },
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setNotify({ isOpen: true, message: "Successfully removed from Learning List", type: "success" });
          setRemoveRoadmap(false);
        } else {
          setNotify({ isOpen: true, message: "Unable to remove from Learning list", type: "error" });
          throw new Error("An error has occurred");
        }
      });
  };

  const cloneRoadmap = (boardId) => {
    const abortController = new AbortController();

    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };

    return axios
      .post(`${apiLink}/roadmap/clone`, {}, { params: { user_email: userEmail, roadmap_id: boardId }, headers })
      .then((response) => {
        if (response.status === 200) {
          setNotify({ isOpen: true, message: "Roadmap cloned successfully", type: "success" });
          history(`${RoutesPage.boards}/${response.data.clonedUID}`);
          setBoardId(response.data.clonedUID);
          fetchBoard(response.data.clonedUID, abortController.signal);
        } else {
          setNotify({ isOpen: true, message: "Unable to clone roadmap", type: "error" });
          throw new Error("An error has occurred");
        }
      });
  };

  const deleteTask = async (event, paperId) => {
    const abortController = new AbortController();
    event?.preventDefault();
    event?.stopPropagation();
    console.log(paperId);
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(`${apiLink}/paper/?paper_id=${paperId}&roadmap_id=${boardId}`, {
      headers,
    });
    try {
      if (response.status === 200) {
        setNotify({ isOpen: true, message: "Paper removed successfully", type: "success" });
        getPapersdata(abortController.signal);
        window.location.reload();
      } else {
        setNotify({ isOpen: true, message: "Unable to remove paper", type: "error" });
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setNotify({ isOpen: true, message: "Error Occured while removing paper", type: "error" });
      console.log("An error has occurred");
    }
  };

  const updateTask = async () => {
    const abortController = new AbortController();
    setNameIsEditable(false);
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    if (wordFilter.isProfane(boardName)) {
      setNotify({ isOpen: true, message: "Roadmap name cannot conatin restricted words", type: "error" });
    } else if (wordFilter.isProfane(boardDescription)) {
      setNotify({ isOpen: true, message: "Roadmap description cannot conatin restricted words", type: "error" });
    } else {
      const payload = {
        name: boardName,
        description: boardDescription,
        rating: board?.rating,
        author: "string",
        imageURL: thumbnailURL,
        tags: chipData,
        levels: board?.levels,
        public: true,
      };
      const response = await axios.put(`${apiLink}/roadmap/?roadmap_id=${boardId}`, payload, {
        params: { roadmap_id: boardId },
        headers,
      });
      try {
        if (response.status === 200) {
          fetchBoard(boardId, abortController.signal);
          setNotify({ isOpen: true, message: "Roadmap updated successfully", type: "success" });
          console.log(` You have updated: ${JSON.stringify(response.data)}`);
          window.location.reload();
        } else {
          setNotify({ isOpen: true, message: "Unable to update roadmap", type: "error" });
          throw new Error("An error has occurred");
        }
      } catch (error) {
        setNotify({ isOpen: true, message: "Error occured while updating roadmap", type: "error" });
        console.log("An error has occurred");
      }
    }
  };

  const uidNameMap: { uid: string; name: string }[] = JSON.parse(localStorage.getItem("uidNameMap") || "");

  function getAuthorName(authorUid) {
    let author = "";
    uidNameMap.forEach((data) => {
      if (data.uid === authorUid) {
        author = data.name;
      }
    });
    return author;
  }

  function checkRoadmapOwner(board) {
    let token = localStorage.getItem("userToken") || "";
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    const user_id = payload.user_id;
    if (board.author == user_id) {
      setIsOwner(true);
    }
  }

  function handleThumbnailSelect(e) {
    console.log(e.target.files[0]);
    setUploadPicture(null);
    if (e.target.files[0]) {
      setUploadPicture(e.target.files[0]);
      console.log("File Uploaded");
    }
  }

  async function handleThumbnail(e) {
    const abortController = new AbortController();

    if (uploadPicture) {
      const URL = await uploadThumbnail(uploadPicture, boardId, setUploadPicture, setLoading, setThumbnailURL);
      console.log("URL:", URL);
      setThumbnailURL(URL);
      setUploadPicture(null);
      fetchBoard(boardId, abortController.signal);
    }
  }

  async function handlePaperChange(cardID, paperName, paperLink) {
    const abortController = new AbortController();
    console.log("paperID", cardID);
    console.log("paperName", paperName);
    console.log("paperLink", paperLink);
    console.log("boardID", boardId);
    let token = localStorage.getItem("userToken");
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    const payload = {
      name: wordFilter.clean(paperName),
      publish: "",
      roadmaps: {},
      link: "paperLink",
    };
    const response = await axios.put(
      `${apiLink}/paper/?paper_id=${cardID}&roadmap_uid=${boardId}&del_flag=false`,
      payload,
      { headers }
    );
    try {
      if (response.status === 200) {
        fetchBoard(boardId, abortController.signal);
        setNotify({ isOpen: true, message: "Roadmap updated successfully", type: "success" });
        console.log(` You have updated: ${JSON.stringify(response.data)}`);
        handleClose();
        window.location.reload();
      } else {
        setNotify({ isOpen: true, message: "Unable to update roadmap", type: "error" });
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setNotify({ isOpen: true, message: "Error occured while updating roadmap", type: "error" });
      console.log("An error has occurred");
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      fetchBoard(props.boardId, abortController.signal);
      fetchUserLearningList(abortController.signal);
      getPapersdata(abortController.signal);
    }

    // if (!ignore) {
    //   fetchData();
    // }
    fetchData();
    return () => {
      abortController.abort();
      setBoard(undefined);
      setChipData(["Angular", "jQuery", "Polymer", "React", "Vue.js"]);
      setBoardName("");
      setBoardDescription("");
      setBoardLevels(0);
      setThumbnailURL("");
      setUserLearningList(undefined);
      setPapers([]);
      setReferencedWorks([]);
      setColumns([]);
      //setPapers  setReferencedWorks setColumns
    };
  }, [props]);

  const renderCard = ({ content }, { removeCard, dragging }) => {
    <>
      <PaperCard boardId={boardId} task={content}></PaperCard>
    </>;
  };

  const imageURL = "https://cdn.pixabay.com/photo/2023/05/20/20/39/european-roller-8007340__340.jpg";
  const imageURL2 = "../../../assets/photos/AI.jpg";
  const isEmptyRecentBoards = (): boolean => {
    if (!board) {
      return true;
    }
    if (board && Object.keys(board).length == 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Toolbar />
      <Box style={{ width: "100%", minHeight: "83vh", paddingTop: "60px" }}>
        {/* <ActionAlerts /> */}
        {isEmptyRecentBoards() && <Spinners />}
        {board && Object.keys(board).length > 0 && (
          <Box
            style={{ width: "100%", paddingLeft: isBigScreen ? "10%" : "5%", paddingRight: isBigScreen ? "10%" : "5%" }}
          >
            {/* Board Area Header */}
            <Box
              style={{
                padding: "20px",
                backgroundImage: `url(${thumbnailURL})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                boxShadow: "0 3000px rgba(0, 0, 0, 0.4) inset",
              }}
            >
              <Box style={{ display: "flex" }}>
                <Box style={{ width: "90%", display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                  {nameIsEditable ? (
                    <TextField
                      variant="filled"
                      fullWidth
                      style={{ marginBottom: "10px", color: "white", background: "rgb(232, 241, 250)" }}
                      placeholder="Roadmap Name"
                      value={boardName}
                      onChange={(event) => setBoardName(event.target.value)}
                    />
                  ) : (
                    <Typography
                      variant="h5"
                      sx={{
                        width: "100%",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "white",
                        textShadow: "#000 1px 0 10px",
                      }}
                    >
                      {boardName}
                    </Typography>
                  )}
                  {nameIsEditable ? (
                    <TextField
                      variant="filled"
                      multiline={true}
                      fullWidth
                      style={{ textShadow: "#FC0 1px 0 10px", color: "white", background: "rgb(232, 241, 250)" }}
                      placeholder="Roadmap Description"
                      value={boardDescription}
                      onChange={(event) => setBoardDescription(event.target.value)}
                    />
                  ) : (
                    <Typography sx={{ fontWeight: "bold", color: "white", textShadow: "#000 1px 0 10px" }}>
                      {boardDescription}
                    </Typography>
                  )}
                </Box>

                {isOwner && (
                  <>
                    {" "}
                    {nameIsEditable ? (
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "300px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {uploadPicture ? (
                          <>
                            <Button
                              variant="contained"
                              component="span"
                              style={{
                                margin: "8px",
                                backgroundColor: "#536680",
                                borderRadius: "20px",
                                maxWidth: "150px",
                                maxHeight: "40px",
                              }}
                              startIcon={<InsertPhotoIcon />}
                              onClick={(e) => handleThumbnail(e)}
                            >
                              Upload
                            </Button>
                          </>
                        ) : (
                          <>
                            <label htmlFor="upload-photo">
                              <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={(e) => handleThumbnailSelect(e)}
                              />
                              <Button
                                variant="contained"
                                component="span"
                                style={{
                                  margin: "8px",
                                  backgroundColor: "#536680",
                                  borderRadius: "20px",
                                  maxWidth: "150px",
                                  maxHeight: "40px",
                                }}
                                startIcon={<InsertPhotoIcon />}
                              >
                                Thumbnail
                              </Button>
                            </label>
                          </>
                        )}
                        <Tooltip title="Click to save changes made in roadmap Name, Description & Tags" placement="top">
                          <Button
                            variant="contained"
                            style={{
                              margin: "8px",
                              backgroundColor: "#536680",
                              borderRadius: "20px",
                              maxWidth: "80px",
                              maxHeight: "40px",
                            }}
                            startIcon={<Save />}
                            onClick={(e) => updateTask()}
                          >
                            Save
                          </Button>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Tooltip
                        title="Click to start making changes in roadmap Name, Description & Tags"
                        placement="top"
                      >
                        <Button
                          variant="contained"
                          style={{
                            marginLeft: "auto",
                            backgroundColor: "#536680",
                            borderRadius: "20px",
                            maxWidth: "80px",
                            maxHeight: "40px",
                          }}
                          startIcon={<Edit />}
                          onClick={() => setNameIsEditable(!nameIsEditable)}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                    )}
                  </>
                )}
                <Box style={{ marginBottom: "10px" }}></Box>
              </Box>

              <Box style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0,
                    mb: 0,
                  }}
                  component="ul"
                >
                  {chipData.map((data) => {
                    let icon;

                    return (
                      <ListItem>
                        {isOwner && nameIsEditable ? (
                          <Chip
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                            icon={icon}
                            label={data}
                            onDelete={handleDelete(data)}
                          />
                        ) : (
                          <Chip style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} icon={icon} label={data} />
                        )}
                      </ListItem>
                    );
                  })}
                </Box>
                {isOwner && nameIsEditable && (
                  <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TextField
                      variant="standard"
                      style={{
                        width: 300,
                        background: "rgb(232, 241, 250)",
                        margin: "1rem",
                      }}
                      placeholder="Tags"
                      value={chipInput}
                      onKeyDown={(e) => {
                        if (e.key === " ") handleAddChipInput(chipInput);
                      }}
                      onChange={(event) => setChipInput(event.target.value)}
                    />
                    <Tooltip title="Click this button or press spacebar to enter a tag" placement="top" arrow>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#3d5a80",
                          borderRadius: "20px",
                          maxWidth: "100px",
                          maxHeight: "40px",
                          // margin: "5px",
                        }}
                        onClick={() => handleAddChipInput(chipInput)}
                      >
                        Add Tag
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Box>

              <Box
                sx={{ marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "center", margin: 0.5 }}
              >
                <Typography variant="h6" style={{ color: "white" }}>
                  {board.rating}&nbsp;
                </Typography>
                <Rating
                  name="hover-feedback"
                  value={board.rating}
                  precision={0.5}
                  size="small"
                  readOnly={!RemoveRoadmap}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    changeRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
              </Box>
              <Box
                sx={{ alignItems: "center", display: "flex", flexDirection: "row", marginBottom: "15px", margin: 0.5 }}
              >
                <Typography fontWeight={"bold"} style={{ color: "white" }}>
                  By&nbsp;
                </Typography>
                <Typography variant="h6" style={{ color: "white" }}>
                  {getAuthorName(board.author) || board?.author}
                </Typography>
              </Box>
              <Box>
                {RemoveRoadmap ? (
                  <Tooltip title="This action will remove the roadmap from your learning list" placement="top" arrow>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#3d5a80", borderRadius: "20px", margin: 0.5 }}
                      startIcon={<DeleteForeverOutlined />}
                      color="primary"
                      onClick={() => deleteFromLearningList(boardId)}
                    >
                      Remove from learning list
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="This action will add the roadmap to your learning list" placement="top" arrow>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#3d5a80",
                        borderRadius: "20px",
                        margin: "5px",
                      }}
                      startIcon={<AddCircleOutlineIcon />}
                      color="primary"
                      onClick={() => addToLearningList(boardId)}
                    >
                      Add to my learning list
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="This action will clone the current roadmap to your roadmap" placement="top" arrow>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#3d5a80", borderRadius: "20px", margin: "5px" }}
                    startIcon={<FileCopyIcon />}
                    color="primary"
                    onClick={() => cloneRoadmap(boardId)}
                  >
                    Clone
                  </Button>
                </Tooltip>
                {isOwner && (
                  <>
                    <Tooltip title="This action will delete the roadmap" placement="top" arrow>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#3d5a80", borderRadius: "20px", margin: "5px" }}
                        startIcon={<DeleteForeverOutlined />}
                        color="primary"
                        onClick={() => deleteRoadmap(boardId)}
                      >
                        Delete Roadmap
                      </Button>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Box>

            {/* Board Area Body */}
            <Fade in={true} timeout={2000}>
              <div style={{ backgroundColor: "aliceblue", marginTop: "20px" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {renderTabs()}
                    {boardLevels < 3 && isOwner ? (
                      <Button onClick={updateLevel}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                      </Button>
                    ) : null}
                  </Tabs>
                </Box>
                <Box style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                  <TabPanel value={value} index={0}>
                    {columns[0] ? (
                      columns[0]?.cards?.map((card) => (
                        <Card
                          key={card.id}
                          sx={{ width: "100%", display: "flex", marginY: "10px", cursor: "pointer" }}
                          onClick={() => {
                            history(`/paper/${card.id}/${id}/?page=1`);
                          }}
                        >
                          {isBigScreen ? (
                            <CardMedia
                              component="img"
                              sx={{ width: 150, transform: "scale(0.5)" }}
                              image={pdfIcon}
                              alt="PDF icon"
                            />
                          ) : (
                            <></>
                          )}
                          <CardActionArea>
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", backgroundColor: "" }}>
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant={isBigScreen ? "h5" : "h6"}>
                                  {card.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  {card.description}
                                </Typography>
                              </CardContent>
                              {isOwner ? (
                                <CardActions>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpen();
                                      setCardID(card.id);
                                    }}
                                  >
                                    <Edit></Edit>Edit
                                  </Button>
                                  {/* <Button size="small" color="primary" style={{ position: 'relative', right: '0' }} onClick={(event) => { event.stopPropagation(); handlePaperEdit(card.id, true) }}>
                                </Button> */}
                                  <Button
                                    size="small"
                                    color="primary"
                                    style={{ position: "relative", right: "0" }}
                                    onClick={(event) => deleteTask(event, card.id)}
                                  >
                                    <DeleteIcon></DeleteIcon>
                                    <Typography>Delete</Typography>
                                  </Button>
                                </CardActions>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </CardActionArea>
                        </Card>
                      ))
                    ) : (
                      <Typography variant="h5" component="div">
                        No papers found
                      </Typography>
                    )}
                    {isOwner && (
                      <AddPaper boardId={boardId} level={1} refreshOnSuccess={getPapersdata} setNotify={setNotify} />
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {columns[1] ? (
                      columns[1].cards.map((card) => (
                        <Card
                          key={card.id}
                          sx={{ width: "100%", display: "flex", marginY: "10px", cursor: "pointer" }}
                          onClick={() => {
                            history(`/paper/${card.id}/${id}/?page=1`);
                          }}
                        >
                          {isBigScreen ? (
                            <CardMedia
                              component="img"
                              sx={{ width: 150, transform: "scale(0.5)" }}
                              image={pdfIcon}
                              alt="PDF icon"
                            />
                          ) : (
                            <></>
                          )}
                          <CardActionArea>
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", backgroundColor: "" }}>
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant={isBigScreen ? "h5" : "h6"}>
                                  {card.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  {card.description}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  size="small"
                                  color="primary"
                                  style={{ position: "relative", right: "0" }}
                                  onClick={(event) => deleteTask(event, card.id)}
                                >
                                  <DeleteIcon></DeleteIcon>
                                  <Typography>Delete</Typography>
                                </Button>
                              </CardActions>
                            </Box>
                          </CardActionArea>
                        </Card>
                      ))
                    ) : (
                      <Typography variant="h5" component="div">
                        No papers found
                      </Typography>
                    )}
                    {isOwner && (
                      <AddPaper boardId={boardId} level={2} refreshOnSuccess={getPapersdata} setNotify={setNotify} />
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {columns[2] ? (
                      columns[2].cards.map((card) => (
                        <Card
                          key={card.id}
                          sx={{ width: "100%", display: "flex", marginY: "10px", cursor: "pointer" }}
                          onClick={() => {
                            history(`/paper/${card.id}/${id}/?page=1`);
                          }}
                        >
                          {isBigScreen ? (
                            <CardMedia
                              component="img"
                              sx={{ width: 150, transform: "scale(0.5)" }}
                              image={pdfIcon}
                              alt="PDF icon"
                            />
                          ) : (
                            <></>
                          )}
                          <CardActionArea>
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", backgroundColor: "" }}>
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant={isBigScreen ? "h5" : "h6"}>
                                  {card.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  {card.description}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  size="small"
                                  color="primary"
                                  style={{ position: "relative", right: "0" }}
                                  onClick={(event) => deleteTask(event, card.id)}
                                >
                                  <DeleteIcon></DeleteIcon>
                                  <Typography>Delete</Typography>
                                </Button>
                              </CardActions>
                            </Box>
                          </CardActionArea>
                        </Card>
                      ))
                    ) : (
                      <Typography variant="h5" component="div">
                        No papers found
                      </Typography>
                    )}
                    {isOwner && (
                      <AddPaper boardId={boardId} level={3} refreshOnSuccess={getPapersdata} setNotify={setNotify} />
                    )}
                  </TabPanel>
                </Box>
              </div>
            </Fade>
          </Box>
        )}
      </Box>
      <SuggestedRoadmaps roadmap_id={boardId} />
      <Footer />
      <ActionAlerts notify={notify} setNotify={setNotify} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit paper details
          </Typography>
          <Typography id="modal-modal-description" style={{ marginTop: "2px", width: "100%" }}>
            <TextField
              variant="filled"
              style={{ width: "530px", marginTop: "10px" }}
              placeholder="Paper Name"
              value={paperName}
              name="paperName"
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => setPaperName(event.target.value)}
            />
            <TextField
              variant="filled"
              style={{ width: "530px", marginTop: "10px" }}
              placeholder="Paper Link"
              value={paperLink}
              name="paperLink"
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => setPaperLink(event.target.value)}
            />
            <Button
              variant="outlined"
              color="success"
              style={{ margin: "10px" }}
              onClick={(event) => handlePaperChange(cardID, paperName, paperLink)}
            >
              Save
            </Button>
            <Button variant="outlined" color="error" style={{ margin: "10px" }} onClick={handleClose}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default BoardArea;
