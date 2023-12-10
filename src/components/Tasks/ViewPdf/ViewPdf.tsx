import React, { useState, useEffect } from "react";
import { Box, Toolbar, Button } from "@mui/material";
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { getBoard } from "../../../service/roadmaps";
import Pagination from "@mui/material/Pagination";
import { apiLink } from "../../../default";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export function ViewPdf(props) {
  let { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const pgNum = Number(searchParams.get("page"));
  let { uid } = useParams();
  let location = useLocation();
  const [papersData, setPapersData] = useState({});
  const [numPages, setNumPages] = useState<number>();
  // const [pageNumber, setPageNumber] = useState<number>(pgNum);
  // const [fetchingUser, setFetchingUser] = useState(true);
  const [paperLink, setPaperLink] = useState("");

  const token = localStorage.getItem("userToken");

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
  localStorage.setItem("boards", JSON.stringify(setData));

  const getPaperData = async (signal: any) => {
    console.log(id);
    try {
      const response = await fetch(`${apiLink}/paper/${id}?roadmap_id=${uid}`, {
        signal,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (!signal.aborted) {
        setPapersData(json);
        setPaperLink(json.link);
        console.log(json.link);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function onNextPageButtonClick(event, page: number) {
    setSearchParams(`page=${page}`);

    // setInterval(function, 1000)
  }
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    const abortController = new AbortController();

    getPaperData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Box
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10rem",
          backgroundColor: "aliceblue",
        }}
      >
        <Box
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Document file={paperLink} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pgNum} />
            </Document>
            <p
              style={{
                padding: "2rem",
              }}
            >
              Page {pgNum} of {numPages}
              <Pagination
                style={{
                  margin: "2rem",
                }}
                count={numPages}
                showFirstButton
                showLastButton
                onChange={onNextPageButtonClick}
                variant="outlined"
                color="primary"
              />
            </p>
          </div>
        </Box>
      </Box>
    </>
  );
}
