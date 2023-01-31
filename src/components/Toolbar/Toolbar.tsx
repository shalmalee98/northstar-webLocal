import { Button, Slide, useMediaQuery, useTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import AppToolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Toolbar.css";
import { Routes } from "../../service/config";
import LogoImage from "./../../images/icon.png";
import { auth, logout } from '../../firebase';
import { LoginBlock } from "../LoginBlock/LoginBlock";
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export const title = "Northstar";


export const Toolbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const userEmail = localStorage.getItem("token")?.replace('"', '');

  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/");
  }, []);


  const fetchLearningList = () => {
    return axios.get(`https://p9m3dl.deta.dev/user/learning_list`, { params: { user_email: userEmail } })
      .then(response => {
        if (response.status === 200) {
          console.log(` You have modified: ${JSON.stringify(response.data)}`);
          history.push(Routes.learning)
        } else {
          throw new Error("An error has occurred");
        }
      }
      )
  }

  return (
    <Slide direction="down" in={true} timeout={800}>
      <AppBar position="sticky" className="AppBar" color="inherit">
        <AppToolbar>
          <div className="HeaderContainer">
            <div className="HeaderLeftContainer" onClick={() => history.push("/dashboard")}>
              {/* <AssignmentTurnedInIcon color='primary' className='HeaderIcon' /> */}
              <img
                alt="React Northstar App"
                style={{ height: "40px", width: "40px", transform: isSmallScreen ? "scale(0.5)" : "none" }}
                src={LogoImage}
              ></img>
              <Typography variant={isSmallScreen ? "subtitle1" : "h5"} color="inherit" noWrap>
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title="New Roadmap"
                startIcon={<AddCircleOutlineIcon />}
                color="primary"
                onClick={() => history.replace("/create")}
              >
                {!isSmallScreen ? "Create" : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? "small" : "large"}
                color="primary"
                onClick={() => history.push(Routes.explore)}
              >
                {!isSmallScreen ? "Explore" : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? "small" : "large"}
                color="primary"
                onClick={() => history.push(Routes.learning)}
              >
                {!isSmallScreen ? "Start Learning" : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? 'small' : 'large'}
                color='primary'
                onClick={() => logout()}
              >
                {!isSmallScreen ? 'Sign Out' : null}
              </Button>
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
