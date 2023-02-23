import { Button, Card, CardActions, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Description } from "@material-ui/icons";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ulid } from "ulid";
import { addTask } from "../../../service/task";
import { Paper } from "../../../types/roadmap";
import { Status } from "../../../types/status";
import "./AddPaper.css";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export interface AddPaperProps {
  boardId: string;
  show: boolean;
  onClose: () => void;
}
export const AddPaper = ({ show, boardId, onClose }) => {
  const history = useHistory();
  const [taskName, setTaskName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [taskLevel, setTaskLevel] = useState(1);
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

    const response = await axios.post(` https://p9m3dl.deta.dev/paper`, paperDetails);
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
    <Dialog aria-labelledby="simple-dialog-title" open={show} onClose={onClose}>
      <DialogTitle id="simple-dialog-title">
        Add Paper
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Card variant="outlined" className="AddTaskCard">
            <CardContent className="AddTaskCardContent">
              <TextField
                className="AddTaskTextField"
                required
                style={{marginBottom:'20px'}}
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
                style={{marginBottom:'20px'}}
                label="Link to Paper"
                placeholder="Enter URL"
                defaultValue={link}
                variant="outlined"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setLink(event.target.value)}
              />
              {/* <TextField
                className="AddTaskTextField"
                required
                id="paper-level-input"
                style={{marginBottom:'20px'}}
                label="Paper Level"
                placeholder="Enter the level"
                defaultValue={taskLevel}
                variant="outlined"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskLevel(parseInt(event.target.value))}
              /> */}
              <FormControl className="AddTaskTextField">
                    <InputLabel id="demo-simple-select-label">Enter the number of levels</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="paper-level-input"
                      value={taskLevel}
                      label="Paper Level"
                      variant="outlined"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskLevel(parseInt(event.target.value))}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
            </CardContent>
            <CardActions className="AddTaskCardAction">
              <Button type="submit" variant="contained" color="primary" className="AddTaskButton">
                Add
              </Button>
            </CardActions>
          </Card>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
