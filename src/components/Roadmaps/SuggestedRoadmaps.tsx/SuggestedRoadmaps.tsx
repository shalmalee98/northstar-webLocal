import React, { useEffect, useState } from "react";
import CardArea from "../../Card/CardArea";
import { Box, Typography } from "@mui/material";
import { apiLink } from "../../../default";

function SuggestedRoadmaps({ roadmap_id }) {
  const [recommendations, setRecommendations] = useState([]);

  async function fetchData() {
    try {
      let token = localStorage.getItem("userToken");
      const response = await fetch(`${apiLink}/roadmap/recommendation?roadmap_id=${roadmap_id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRecommendations(data);
      const result = data.items;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box style={{ marginTop: "30px", marginBottom: "30px" }}>
      <Typography variant="h5" style={{ marginLeft: "15%", fontWeight: "bold" }}>
        Suggested Roadmaps {recommendations.length == 0 && <Typography>Not Available</Typography>}
      </Typography>
      <Box className="ccardbox">
        {recommendations.slice(0, 4).map((recommendation) => (
          <CardArea roadmap={recommendation} inLearningList={false} />
        ))}
      </Box>
    </Box>
  );
}
export default SuggestedRoadmaps;
