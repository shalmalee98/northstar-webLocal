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
import { auth, db } from "../../firebase";
const img = require("../../assets/illustrations/computer-vision-and-image-processing.jpeg");

export default function CardAuthor({ item }) {
  const [value, setValue] = React.useState(4.3);
  const history = useNavigate();

  const uidNameMap: { uid: string; name: string }[] = JSON.parse(localStorage.getItem("uidNameMap") || "");

  //   function getAuthorName(authorUid) {
  //     let author = "";
  //     uidNameMap.forEach((data) => {
  //       if (data.uid === authorUid) {
  //         author = data.name;
  //       }
  //     });
  //     return author;
  //   }

  const openSearch = (author) => {
    history(`/search/?filter=author&name=${item.name}`);
    //     history({
    //       pathname: "/search",
    //       search: `${author}`,
    //       state: "author",
    //     });
    //   };
  };

  return (
    <Card sx={{ width: 280, margin: "10px" }} onClick={() => openSearch(item.uid)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={getIllustration(Math.floor(Math.random() * 3))}
          alt={item.name}
          style={{ backgroundColor: `${getBackgrounds(Math.floor(Math.random() * 5))}` }}
        />
        <CardContent style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" gutterBottom component="div" style={{ fontWeight: "bold" }}>
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
