import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Box, Toolbar, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, useLocation } from "react-router-dom";
import { getBoard } from "../../../service/roadmaps";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function ViewPdf(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  const [papersData, setPapersData] = useState({});
  const [referencedWorks, setReferencedWorks] = useState(Array());
  const [paperLink, setPaperLink] = useState('');
  const history = useHistory();
  const location = useLocation();

  const setData = [
    {
      name: "Machine Learning Basics",
      createdBy: "ML, AI",
      createdAt: "2022-06-24T03:55:16.121Z",
      id: "0",
      //   tasks: sampleTasks,
    },
  ];

  const currentBoard = getBoard(props.pdf);
  console.log("Cuurent board", currentBoard);

  localStorage.setItem("boards", JSON.stringify(setData));

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const getPaperData = async () => {
    try {
      const response = await fetch(`https://p9m3dl.deta.dev/paper/info${props.location.state.card.id}/${props.location.state.boardId}`, {
        method: "GET",
      });
      const json = await response.json();
      setPapersData(json);
      setPaperLink(json.link);
      var arr = Array();
      json.referenced_works.map(work => {
        arr.push({ label: work.title, url: work.url })
      })
      setReferencedWorks(arr)
    } catch (error) {
      console.log(error);
    }
  }


  var str = {};
  Object.assign(str, history.location.state);
  console.log(Object.values(str))
  var task = {}
  Object.assign(task, (Object.values(str))[0]);
  // Object.assign(task, (Object.values(task))[0]);

  const handleNavigation = async (paperUrl) => {
    try {
      const response = await fetch(`https://p9m3dl.deta.dev/roadmap/papers/info${(Object.values(task))[0]}/`, {
        method: "GET",
      });
      const json = await response.json();
      // const result = json;
      setReferencedWorks(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      getPaperData();
    }
    fetchData();
  }, []);

  return (
    <>
      <Toolbar />
      <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px', backgroundColor: 'aliceblue' }}>
        <Box style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'cnter' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'black', backgroundColor: 'white' }}
            onClick={() => { history.replace(`/board/${props.location.state.boardId}`) }}
          >
            Back
          </Button>
          <Autocomplete
            disablePortal
            // onOpen={handleNavigation}
            id="combo-box-demo"
            options={referencedWorks}
            sx={{ width: '80%', backgroundColor: 'white', marginLeft: '10px' }}
            renderInput={(params) => <TextField {...params} label="Search cited papers" />}
          />
        </Box>
        <Box style={{ width: '100%' }}>
          <iframe src={paperLink} frameBorder="0" height="780px" width="100%"></iframe>
        </Box>
      </Box>
    </>
  );
}
