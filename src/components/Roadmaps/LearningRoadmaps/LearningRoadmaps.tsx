import {
  Card,
  CardContent,
  CardHeader,
  Grow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getBoards } from '../../../service/roadmaps';
import { Routes } from '../../../service/config';
import { Roadmap } from '../../../types/roadmap';
import { getIllustration, getBackground } from '../../../utils';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import '../RecentRoadmaps/RecentRoadmaps.css';
import axios from 'axios'

export const LearningRoadmaps = () => {
  const history = useHistory();
  const [recentBoards, setRecentBoards] = useState<Roadmap[] | undefined>(undefined);
  // const [learningList, setLearningList] = useState(Array);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {

      return axios.get(`https://p9m3dl.deta.dev/user/learning_list?user_email=jinjun@gmail.com`)
        .then(response => {
          if (response.status === 200) {
            console.log(` You have fetched: ${JSON.stringify(response.data)}`);
            // setRecentBoards(response.data);
            let learningBoards = Array();
            let promiseArr = Array();
            response.data.data.learning_list.map(roadmap => {
              promiseArr.push(axios.get(`https://p9m3dl.deta.dev/roadmap/info${roadmap}`)
                .then(resp => {
                  console.log("Response : ", resp.data);
                  return resp.data
                }).catch(erro => {
                  console.log("Error: ", erro)
                }))
            })

            Promise.all(promiseArr).then(res => {
              console.log(res)

              learningBoards.push(res.filter(r => r != undefined))
              console.log(learningBoards)
              setRecentBoards(learningBoards[0])
            }).catch(err => {
              console.log("Error exists:", err)
            })

          } else {
            throw new Error("An error has occurred");
          }
        }
        )
    }
    fetchData();
  }, []);

  const isEmptyRecentBoards = (): boolean => {
    if (!recentBoards) {
      return true;
    }
    if (recentBoards && recentBoards.length === 0) {
      return true;
    }
    return false;
  };

  const openRoadmap = (board) => {
    history.push(`${Routes.boards}/${board.uid}`, board);
  };

  return (
    <>
      <Toolbar />
      <Grow in={true} timeout={1000}>
        <div className="ccard">

          {isEmptyRecentBoards() && <Typography variant="body2">No roadmaps found</Typography>}
          {recentBoards && recentBoards.length > 0 && (
            <div className="ccardbox">
              {recentBoards.map((recentBoard) => (
                <div
                  className="dcard"
                  style={getBackground(Math.floor(Math.random() * 5))}
                  onClick={() => openRoadmap(recentBoard)}
                >
                  <div className="fpart">
                    <img src={getIllustration(Math.floor(Math.random() * 3))} />
                  </div>
                  <div className="spart">{recentBoard.name}</div>
                  <Button className="spart2" startIcon={<PersonPinIcon />} style={{ textTransform: "none" }}>
                    {recentBoard.author}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Grow>
    </>
  );
};
