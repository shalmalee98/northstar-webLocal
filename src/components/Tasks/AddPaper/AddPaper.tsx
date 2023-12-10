import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Collapse from "@mui/material/Collapse";

import { PlaylistAdd } from "@mui/icons-material";
import "./AddPaper.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiLink } from "../../../default";
import { getAutoComplete, getPaperFromOA } from "../../Roadmaps/BoardArea/OAManager";
import { wordFilter } from "../../../service/wordFilter";

export interface AddPaperProps {
  boardId: string;
  show: boolean;
  onClose: () => void;
}

export const AddPaper = ({ boardId, level, refreshOnSuccess, setNotify }) => {
  const [difficulty, setDifficulty] = useState(1);
  const [expanded, setExpanded] = React.useState(false);
  const [paperName, setPaperName] = React.useState("");
  const [paperLink, setPaperLink] = React.useState("");
  const [autoSuggestPaperName, setAutoSuggestPaperName] = React.useState<any[]>([]);
  const isBigScreen = useMediaQuery("(min-width: 600px)");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const searchOpenSource = async (event) => {
    event.preventDefault();
    const result = await getAutoComplete("data");
    console.log("result", result);
    setAutoSuggestPaperName(result);
  };

  const handleSelect = async (item) => {
    console.log("handleSelect");
    console.log(item);
    if (item.url !== "" && item.url !== null) {
      handleSubmitOnSelect(item?.display_name, item?.external_id);
    } else {
      console.log("eleesd2");
      let index = item.id.lastIndexOf("/");
      let id = item.id.substring(index + 1);
      let response = await getPaperFromOA({ paperID: id });
      console.log(response);
      // console.log("Paper is", JSON.stringify(response, undefined, 2))

      // TODO: - Find ways to make this typecheck robust
      // The URL can reside in other places too and sometimes the URL we get
      // may not even have PDF but be paywalled.
      if (!response.display_name || !response.host_venue?.url) {
        if (response.primary_location && response.primary_location.landing_page_url) {
          setPaperName(response.display_name);
          setPaperLink(response.primary_location.landing_page_url);
          handleSubmit();
        } else {
          // Alert.alert("Unable to add", "Sorry the paper you have selected cannot be added.")
        }
      } else {
        setPaperName(response.display_name);
        setPaperLink(response.primary_location.landing_page_url);
        handleSubmit();
      }
    }
  };

  const handleSubmitOnSelect = async (name, link) => {
    console.log("name", name);
    console.log("link", link);
    if (wordFilter.isProfane(name)) {
      console.log("Bad word detected");
      setNotify({ isOpen: true, message: "Paper Name cannot conatin restricted words", type: "error" });
    } else {
      const paperDetails = {
        name: name,
        publish: new Date(),
        roadmaps: [
          {
            rm: boardId,
            level: level,
            difficulty: difficulty,
          },
        ],
        link: link,
      };

      let token = localStorage.getItem("userToken");
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${apiLink}/paper/`, paperDetails, { headers });
      try {
        if (response.status === 200) {
          // console.log(` You have created: ${JSON.stringify(response.data)}`);
          refreshOnSuccess();
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        console.log("An error has occurred");
      }
    }
  };

  const handleSubmit = async () => {
    console.log("hs called");
    if (wordFilter.isProfane(paperName)) {
      setNotify({ isOpen: true, message: "Paper Name cannot conatin restricted words", type: "error" });
    } else {
      const paperDetails = {
        name: paperName,
        publish: new Date(),
        roadmaps: [
          {
            rm: boardId,
            level: level,
            difficulty: difficulty,
          },
        ],
        link: paperLink,
      };

      let token = localStorage.getItem("userToken");
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${apiLink}/paper/`, paperDetails, { headers });
      try {
        if (response.status === 200) {
          // console.log(` You have created: ${JSON.stringify(response.data)}`);
          refreshOnSuccess();
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        console.log("An error has occurred");
      }
    }
  };

  return (
    <Box
      style={{
        marginTop: "40px",
        marginLeft: isBigScreen ? "100px" : "0px",
        marginRight: isBigScreen ? "100px" : "10px",
      }}
    >
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px dashed #536680",
            borderRadius: "10px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <TextField
            required
            label="Paper Name"
            variant="filled"
            style={{ width: "90%", marginBottom: "15px" }}
            defaultValue={paperName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPaperName(event.target.value)}
          />
          <Button variant="contained" onClick={searchOpenSource}>
            Search OpenAlex
          </Button>
          {autoSuggestPaperName.map((item, index) => (
            <List style={{ width: "90%" }}>
              <ListItem disablePadding style={{ backgroundColor: "white" }}>
                <ListItemButton onClick={() => handleSelect(item)}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText key={index}>{item?.display_name}</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          ))}
          <TextField
            required
            label="Paper Link"
            variant="filled"
            style={{ width: "90%" }}
            defaultValue={paperLink}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPaperLink(event.target.value)}
          />
        </Box>
      </Collapse>

      <Box
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          startIcon={<PlaylistAdd />}
          style={{ borderRadius: "20px", backgroundColor: "#3d5a80" }}
          onClick={paperName ? handleSubmit : handleExpandClick}
        >
          Add Paper
        </Button>
      </Box>
    </Box>
  );
};
