import { Card, CardActions, CardContent, CardHeader, Grow, TextField } from "@mui/material";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { Toolbar } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewBoard } from "../../../service/roadmaps";
import { RoutesPage } from "../../../service/config";
import { NewRoadmap } from "../../../types/roadmap";
import "./CreateRoadmap.css";
import ChipInputAutosuggest from "./ChipInputAutosuggest";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import { collection, doc, getDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { apiLink } from "../../../default";

export const CreateRoadmap = () => {
  const suggestions = [
    "machine Learning",
    "ML",
    "AI",
    "computer vision",
    "deep learning",
    "ML/DL",
    "CNN",
    "ANN",
    "reinforcement learning",
    "NLP",
    "neural network",
    "unsupervised",
    "back propagation",
    "bag of words",
    "batch normalization",
    "bayesian network",
    "BERT",
  ];
  const history = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [roadmapName, setRoadmapName] = React.useState("");
  const [roadmapType, setRoadmapType] = React.useState("adult");
  const [createdBy, setCreatedBy] = useState("author");
  const [createdByEmail, setCreatedByEmail] = useState("author");
  const [levels, setLevels] = useState(1);
  const [tags, setTags] = useState<any>([""]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("New roadmap");
  let token = localStorage.getItem("userToken");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const postData: NewRoadmap = {
      name: roadmapName,
      levels: levels,
      tags: tags,
      description: description,
      rating: rating,
      author: createdBy,
      email: createdByEmail,
      public: true,
      roadMapType: roadmapType,
    };

    const response = await axios.post(`${apiLink}/roadmap/`, postData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      if (response.status === 200) {
        console.log(` You have created: ${JSON.stringify(response.data)}`);
        history(`${RoutesPage.boards}/${response.data.uid}`);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("An error has occurred");
    }
  };

  return (
    <Box style={{ marginTop: "30px", marginBottom: "10px" }}>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TextField
          label="Roadmap Name*"
          variant="filled"
          style={{ width: 350 }}
          defaultValue={roadmapName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRoadmapName(event.target.value)}
        />
      </Collapse>
      <ChipInputAutosuggest data={suggestions} />
      <Button
        variant="contained"
        sx={{ width: "200px", fontSize: "16px", marginTop: "10px" }}
        onClick={roadmapName ? handleSubmit : handleExpandClick}
        color={roadmapName ? "success" : "primary"}
      >
        Create
      </Button>
    </Box>
  );
};
