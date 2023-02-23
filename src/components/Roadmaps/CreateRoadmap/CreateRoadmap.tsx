import { Box, Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import { Toolbar } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewBoard } from '../../../service/roadmaps';
import { Routes } from '../../../service/config';
import { NewRoadmap } from '../../../types/roadmap';
import './CreateRoadmap.css';
import ChipInputAutosuggest from "./ChipInputAutosuggest";
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    "BERT"
  ];
  const history = useHistory();
  const [roadmapName, setRoadmapName] = useState('');
  const [createdBy, setCreatedBy] = useState('Jinjun Xiong');
  const [createdByEmail, setCreatedByEmail] = useState("jinjun@gmail.com");
  const [levels, setLevels] = useState(1);
  const [tags, setTags] = useState<any>([]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("New roadmap");
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const postData: NewRoadmap = {
      "name": roadmapName,
      "levels": levels,
      "tags": tags,
      "description": description,
      "rating": rating,
      "author": createdBy,
      "email": createdByEmail,
      "public": true
    };
    const newBoardId = await addNewBoard(postData);

    const response = await axios.post(`https://p9m3dl.deta.dev/roadmap`, postData);
    try {
      if (response.status === 200) {
        console.log(` You have created: ${JSON.stringify(response.data)}`);
        history.push(`${Routes.boards}/${response.data.data.uid}`, postData);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("An error has occurred");
    }
    history.push(`${Routes.boards}/${newBoardId}`, postData);
  };

  return (
    <>
      <Toolbar />
      <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grow in={true} timeout={1000}>
          <Box style={{ maxWidth: '600px' }}>
            <form onSubmit={handleSubmit}>
              <Card variant='outlined' className='CreateBoardCard'>
                <CardHeader
                  className='CreateBoardCardHeader'
                  title='New Roadmap'
                  titleTypographyProps={{ variant: 'h4' }}
                />
                <CardContent className='CreateBoardCardContent'>

                  {error ? <Alert severity="error"> Could not create Roadmap!</Alert> : null}
                  <br></br>
                  <TextField
                    className='CreateBoardTextField'
                    required
                    id='filled-required'
                    label='Roadmap Name'
                    placeholder='Enter a name for the roadmap'
                    defaultValue={roadmapName}
                    variant='outlined'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setRoadmapName(event.target.value)}
                  />
                  {/* <TextField
                    className='CreateBoardTextField'
                    required
                    id='filled-required'
                    label='Levels'
                    placeholder='Enter the number of levels'
                    defaultValue={levels}
                    variant='outlined'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setLevels(parseInt(event.target.value))}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Enter the number of levels</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={levels}
                      label="Levels"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setLevels(parseInt(event.target.value))}
                    >
                      <MenuItem value={1}>Beginner</MenuItem>
                      <MenuItem value={2}>Intermediate</MenuItem>
                      <MenuItem value={3}>Advanced</MenuItem>
                      {/* <MenuItem value={4}>4</MenuItem> */}
                    </Select>
                  </FormControl>
                  {/* <TextField
              className='CreateBoardTextField'
              required
              id='filled-required'
              label='Tags'
              placeholder='Enter relevant tags'
              defaultValue={tags}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTags(event.target.value)}
            /> */}
                  <ChipInputAutosuggest data={suggestions} />
                </CardContent>
                <CardActions className='CreateBoardCardAction'>
                  <Button type='submit' variant='contained' color='primary' className='CreateBoardButton'>
                    Next
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Box>
        </Grow>
      </Box>
    </>
  );
};