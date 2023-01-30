import { CssBaseline } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { RoadmapPage } from "./pages/RoadmapPage/RoadmapPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes } from "./service/config";
import "./App.css";
import { ViewPdf } from "./components/Tasks/ViewPdf/ViewPdf";
import { RecentRoadmaps } from "./components/Roadmaps/RecentRoadmaps/RecentRoadmaps";
import { RoadmapComponent } from "./components/Roadmaps/Roadmap";
import BoardArea from "./components/Roadmaps/BoardArea/BoardArea";
import { NewPaper } from "./components/Tasks/AddPaper/NewPaper";
import LandingPage from "./pages/LandingPage/components/LandingPage";
import { LearningRoadmaps } from "./components/Roadmaps/LearningRoadmaps/LearningRoadmaps";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";

function App() {
  const token = localStorage.getItem("token");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return window.location.replace("/");
  }, [user]);


  return (
    <div className="App">
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          {!!user && <Toolbar />}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/Login" component={LoginPage} />
            <Route exact path="/Register" component={RegisterPage} />
            <Route exact path="/ForgotPassword" component={ForgotPasswordPage} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}

            <Route path="/create" component={HomePage} />
            <Route path={`${Routes.boards}/:id`} component={RoadmapPage} />
            {/* <Route path={`${Routes.join}/:id`} component={HomePage} /> */}
            <Route path={`${Routes.explore}`} component={RecentRoadmaps} />
            <Route path={`${Routes.newBoard}`} component={NewPaper} />
            <Route path={`${Routes.pdf}/:id`} component={ViewPdf} />
            <Route path={`${Routes.learning}`} component={LearningRoadmaps} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
}

export default App;
