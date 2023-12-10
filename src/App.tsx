import { StyledEngineProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Tool_bar } from "./components/Toolbar/Tool_bar";
import { RoadmapPage } from "./pages/RoadmapPage/RoadmapPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { RoutesPage } from "./service/config";

import { ViewPdf } from "./components/Tasks/ViewPdf/ViewPdf";
import { CreateRoadmap } from "./components/Roadmaps/CreateRoadmap/CreateRoadmap";
import { RecentRoadmaps } from "./components/Roadmaps/RecentRoadmaps/RecentRoadmaps";

import { NewPaper } from "./components/Tasks/AddPaper/NewPaper";
import LandingPage from "./pages/LandingPage/components/LandingPage";
import { LearningRoadmaps } from "./components/Roadmaps/LearningRoadmaps/LearningRoadmaps";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import TeacherDashBoardPage from "./pages/TeacherPage/TeacherDashBoardPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import Appbar from "./pages/Appbar/Appbar";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UserProfile from "./pages/UserProfile/UserProfile";
import SearchResultPage from "./pages/HomePage/SearchResultPage";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState(localStorage.getItem("userProfile") || null);

  // setInterval(async function () {
  //   const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=AIzaSyANDGmnztamWsPzVR8cEchGYfE0dMhyICw`, {
  //     method: "POST",
  //     headers: {
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //   })
  //   const json = await response.json();
  //   console.log("refresh token", json);
  // }, 1000);

  useEffect(() => {
    // if (loading) return;
    console.log(user);
    if (user) {
      console.log("hi");
      user?.getIdToken().then((data) => localStorage.setItem("userToken", data));

      // console.log(localStorage.getItem("userToken"));
      // console.log("This is the user token", localStorage.getItem("userToken"));
    }
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      {user ? (
        <BrowserRouter>
          <>
            <Tool_bar />
            <Routes>
              {userProfile ? (
                <Route path="/" element={<HomePage></HomePage>} />
              ) : (
                <Route path="/" element={<ProfilePage></ProfilePage>} />
              )}

              {/* <Route  path="/create" element={CreateRoadmap} /> */}
              <Route path={`${RoutesPage.boards}/:id`} element={<RoadmapPage></RoadmapPage>} />
              <Route path={`${RoutesPage.explore}`} element={<RecentRoadmaps></RecentRoadmaps>} />
              <Route path={`${RoutesPage.teacherPage}`} element={<TeacherDashBoardPage></TeacherDashBoardPage>} />
              <Route path={`${RoutesPage.newBoard}`} element={<NewPaper></NewPaper>} />
              <Route path={`${RoutesPage.pdf}/:id/:uid`} element={<ViewPdf></ViewPdf>} />
              <Route path={`${RoutesPage.learning}`} element={<LearningRoadmaps></LearningRoadmaps>} />
              <Route path="/search" element={<SearchResultPage></SearchResultPage>} />
              <Route path="/userProfile" element={<UserProfile></UserProfile>} />
              <Route path="/create" element={<CreateRoadmap />}></Route>
            </Routes>
          </>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <>
            <Appbar />
            <Routes>
              <Route path="/" element={<LandingPage></LandingPage>} />
              <Route path="/Login" element={<LoginPage></LoginPage>} />
              <Route path="/Register" element={<RegisterPage></RegisterPage>} />
              <Route path="/ForgotPassword" element={<ForgotPasswordPage></ForgotPasswordPage>} />
            </Routes>
          </>
        </BrowserRouter>
      )}
    </StyledEngineProvider>
  );
}

export default App;
