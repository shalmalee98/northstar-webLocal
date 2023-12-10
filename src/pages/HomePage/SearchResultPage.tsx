import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Grow, Pagination, Stack } from "@mui/material";
import Spinners from "../../components/Spinners/Spinners";
import CardArea from "../../components/Card/CardArea";
import Toolbar from "@mui/material/Toolbar";
import { Footer } from "../../components/Footer/Footer";
import { Roadmap } from "../../types/roadmap";
import { apiLink } from "../../default";

function SearchResultPage() {

  let [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("filter");
  const searchAuthorName = searchParams.get("name");
  const uidNameMap: { uid: string; name: string }[] = JSON.parse(localStorage.getItem("uidNameMap") || "");

  const [recentBoards, setRecentBoards] = useState<Roadmap[] | undefined>(undefined);
  const [pages, setPages] = useState(1);
  // const location = useLocation();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  function getAuthorUID(authorName: string | null) {
    let author = "";
    uidNameMap.forEach((data) => {
      if (data.name === authorName) {
        author = data.uid;
      }
    });
    console.log(author);
    return author;
  }

  async function fetchData(page) {
    try {
      const authorUID = getAuthorUID(searchAuthorName);
      console.log(searchTerm);
      // let searchTerm = location.search.slice(1);
      let token = localStorage.getItem("userToken");
      if (searchTerm === "author") {
        console.log(searchAuthorName);
        const response = await fetch(`${apiLink}/roadmap/all/?filterUser=${authorUID}&page=${page}&size=10`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        const result = json.items;
        setPages(json.pages);

        const filterAuthor = result.filter((roadmap) => roadmap.author === String(authorUID));
        setRecentBoards(filterAuthor);
      } else {
        console.log(searchQuery);
        const response = await fetch(`${apiLink}/search/roadmap/${searchQuery}?page=${page}&size=10`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        console.log("json", json);
        const result = json.items;
        setRecentBoards(result);
        setPages(json.pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handlePageNavigation(event, value) {
    fetchData(value);
  }

  useEffect(() => {
    fetchData(1);

    return () => {
      setRecentBoards(undefined);
      setPages(1);
    };
  }, [location.search]);

  const isEmptyRecentBoards = (): boolean => {
    if (!recentBoards) {
      return true;
    }
    if (recentBoards && recentBoards.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Toolbar />
      <Toolbar />
      <Grow in={true} timeout={1000} style={{ minHeight: "60vh", display: "flex", flexDirection: "column" }}>
        <div className="ccard">
          {isEmptyRecentBoards() && <Spinners />}
          {recentBoards && recentBoards.length > 0 && (
            <div className="ccardbox">
              {recentBoards.map((recentBoard) => (
                <CardArea roadmap={recentBoard} inLearningList={false} key={recentBoard.uid} />
              ))}
            </div>
          )}
          <Stack spacing={2} style={{ margin: "80px" }}>
            <Pagination count={pages} variant="outlined" color="primary" onChange={handlePageNavigation} />
          </Stack>
        </div>
      </Grow>
      <Footer />
    </>
  );
}
export default SearchResultPage;
