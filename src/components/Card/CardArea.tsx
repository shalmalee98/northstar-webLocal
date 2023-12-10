import { useNavigate } from "react-router-dom";
import { RoutesPage } from "../../service/config";
import { getIllustration, getBackgrounds } from "../../utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function CardArea({ roadmap, inLearningList }) {
  const history = useNavigate();

  const uidNameMap: { uid: string; name: string }[] = JSON.parse(localStorage.getItem("uidNameMap") || "");

  function getAuthorName(authorUid) {
    let author = "";
    uidNameMap.forEach((data) => {
      if (data.uid === authorUid) {
        author = data.name;
      }
    });
    return author;
  }

  const openRoadmap = (board) => {
    history(`${RoutesPage.boards}/${board.uid}`, board);
  };

  return (
    <Card sx={{ width: 280, height: 280, margin: "10px" }} onClick={() => openRoadmap(roadmap)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={roadmap?.imageURL ? roadmap.imageURL : getIllustration(Math.floor(Math.random() * 3))}
          alt={roadmap?.name}
          style={{ backgroundColor: `${getBackgrounds(Math.floor(Math.random() * 5))}` }}
        />
        <CardContent>
          <Typography gutterBottom component="div" style={{ fontWeight: "bold", height: 45 }}>
            {roadmap?.name}
          </Typography>
          <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <AccountCircleIcon />
            <Typography variant="body2" color="text.secondary">
              {getAuthorName(roadmap.author) || roadmap?.author}
            </Typography>
          </Box>
          <Box style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography>{roadmap?.rating}</Typography>
            <Rating name="read-only" value={roadmap?.rating} readOnly />
            <Typography color="text.secondary"></Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
