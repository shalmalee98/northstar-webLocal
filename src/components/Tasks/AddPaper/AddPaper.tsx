import { Button, Card, CardActions, CardContent, Dialog, DialogTitle, TextField } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ulid } from "ulid";
import { addTask } from "../../../service/task";
import { Paper } from "../../../types/roadmap";
import { Status } from "../../../types/status";
import "./AddPaper.css";
import { useHistory } from "react-router-dom";
import axios from 'axios'

export interface AddPaperProps {
  boardId: string;
  show: boolean;
  onClose: () => void;
}
export const AddPaper = ({ show, boardId, onClose }) => {
  const history = useHistory();
  const [taskName, setTaskName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [taskLevel, setTaskLevel] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [link, setLink] = useState("");
  const [referencedWorks, setReferencedWorks] = useState([]);
  const [relatedWorks, setRelatedWorks] = useState([]);
  const [publish, setPublish] = useState("");
  const [d, setData] = useState({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const paperDetails = {
      "name": taskName,
      "publish": new Date(),
      "roadmaps": [
        {
          "rm": boardId,
          "level": taskLevel,
          "difficulty": difficulty
        }
      ],
      "link": link
    };

    const response = await axios.post(`https://p9m3dl.deta.dev/paper`, paperDetails);
    try {
      if (response.status === 200) {
        console.log(` You have created: ${JSON.stringify(response.data)}`);
        onClose();
        window.location.reload();
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("An error has occurred");
    }
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={show}>
      <DialogTitle id="simple-dialog-title">Add Paper</DialogTitle>

      <form onSubmit={handleSubmit}>
        <Card variant="outlined" className="AddTaskCard">
          <CardContent className="AddTaskCardContent">
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Paper Name"
              placeholder="Enter the article name"
              defaultValue={taskName}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskName(event.target.value)}
            />
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Link to Paper"
              placeholder="Enter URL"
              defaultValue={link}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setLink(event.target.value)}
            />
            <TextField
              className="AddTaskTextField"
              required
              id="paper-level-input"
              label="Paper Level"
              placeholder="Enter the level"
              defaultValue={taskLevel}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskLevel(parseInt(event.target.value))}
            />
          </CardContent>
          <CardActions className="AddTaskCardAction">
            <Button type="submit" variant="contained" color="primary" className="AddTaskButton">
              Add
            </Button>
          </CardActions>
        </Card>
      </form>
    </Dialog>
  );
};
