import * as React from "react";
import { useNavigate } from "react-router-dom";
import { RoutesPage } from "../../service/config";
import { getIllustration, getBackground, getBackgrounds } from "../../utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
const img = require("../../assets/illustrations/computer-vision-and-image-processing.jpeg");

export default function CardTag({ tag }) {
  const history = useNavigate();

  const openSearch = (tag) => {
    console.log(tag);
    history(`/search/?filter=${tag.name}`);
    // history.push({
    //     pathname: '/search',
    //     search: `${tag.name}`
    // });
  };

  return (
    <Card sx={{ width: 280, margin: "10px", marginBottom: "30px" }} onClick={() => openSearch(tag)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={getIllustration(Math.floor(Math.random() * 3))}
          alt=""
          style={{ backgroundColor: `${getBackgrounds(Math.floor(Math.random() * 5))}` }}
          // style={{ backgroundColor: 'red' }}
        />
        <CardContent style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" gutterBottom component="div" style={{ fontWeight: "bold" }}>
            {tag.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
