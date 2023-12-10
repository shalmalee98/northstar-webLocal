import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, Button, Container, InputAdornment, } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Footer } from "../../components/Footer/Footer";
import HeroHomepage from "./HeroHomepage";
import TopRatedRoadMaps from "./TopRatedRoadMaps";
import RoadMapsTopics from "./RoadMapsTopics";
import MyLearnings from "./MyLearnings";
import RoadMapsByAuthors from "./RoadMapsByAuthors";
import { Tab } from "@mui/base/Tab";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import "./HomePage.css";
import TextField from "@mui/material/TextField";
import { apiLink } from "../../default";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Roadmap } from "../../types/roadmap";
import { RecentRoadmaps } from "../../components/Roadmaps/RecentRoadmaps/RecentRoadmaps";
import SearchIcon from "@mui/icons-material/Search";
// import { useSearchParams } from "react-router-dom";

import ActionAlerts from "../../components/Alert/ActionAlerts";
import RoadMapsTags from "./RoadMapsTags";
import "./HomePage.css";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

async function fetchUserCollection() {
  let uidNameMap: { uid: string; name: string }[] = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const uid = doc.data().uid;
    const name = doc.data().name;
    uidNameMap.push({ uid: uid, name: name });
  });
  localStorage.setItem("uidNameMap", JSON.stringify(uidNameMap));
}

export const HomePage = () => {
  const [topRatedData, setTopRatedData] = useState<Roadmap[] | undefined>(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabLabels] = useState(["Top Rated", "By Tags", "My Learnings", "By Authors", "By Topics", "Explore All"]);
  const [inputText, setInputText] = useState("");
  const uidNameMap: { uid: string; name: string }[] = JSON.parse(localStorage.getItem("uidNameMap") || "");

  async function fetchTopRatedData() {
    try {
      let token = localStorage.getItem("userToken");
      const response = await fetch(`${apiLink}/roadmap/all/?sortByRank=true`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      const result = json.items;
      console.log(result);
      setTopRatedData(result);
      // setAurthorData();
      // console.log(aurthorData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserCollection();
    fetchTopRatedData();

    return () => {
      setTopRatedData(undefined);
    };
  }, []);

  let inputHandler = (e) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const isBigScreen = useMediaQuery("(min-width: 600px)");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Toolbar />
      <HeroHomepage />
      <Box
        style={{
          width: "100%",
          paddingLeft: isBigScreen ? "10%" : "5%",
          paddingRight: isBigScreen ? "10%" : "5%",
          paddingBottom: "5%",
          paddingTop: "0%",
        }}
      >
        <Tabs defaultValue={0} className="tab-cont" onChange={handleChange} aria-label="basic tabs example">
          <TabsList className="tab-list">
            <Tab className="tab" value={0} {...a11yProps(0)}>
              {tabLabels[0]}
            </Tab>
            <Tab className="tab" value={1} {...a11yProps(0)}>
              {tabLabels[1]}
            </Tab>
            <Tab className="tab" value={2} {...a11yProps(0)}>
              {tabLabels[2]}
            </Tab>
            <Tab className="tab" value={3} {...a11yProps(0)}>
              {tabLabels[3]}
            </Tab>
            <Tab className="tab" value={4} {...a11yProps(0)}>
              {tabLabels[4]}
            </Tab>
            <Tab className="tab" value={5} {...a11yProps(0)}>
              {tabLabels[5]}
            </Tab>
          </TabsList>
          <Box style={{ padding: '15px' }}>
            <TextField
              id="search"
              type="search"
              label={"Search " + tabLabels[tabIndex]}
              onChange={inputHandler}
              sx={{ width: 300 }}
              style={{ borderRadius: '50%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TabPanel value={0}>
            <TopRatedRoadMaps input={inputText} topRatedData={topRatedData} />
          </TabPanel>
          <TabPanel value={1}>
            <RoadMapsTags input={inputText} />
          </TabPanel>
          <TabPanel value={2}>
            <MyLearnings input={inputText} />
          </TabPanel>
          <TabPanel value={3}>
            <RoadMapsByAuthors input={inputText} authorData={uidNameMap} />
          </TabPanel>
          <TabPanel value={4}>
            <RoadMapsTopics input={inputText} />
          </TabPanel>
          <TabPanel value={5}>
            <RecentRoadmaps />
          </TabPanel>
        </Tabs>
        {/* </Box> */}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
