import { CssBaseline } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Tool_bar } from "./components/Toolbar/Tool_bar";
import { RoadmapPage } from "./pages/RoadmapPage/RoadmapPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes } from "./service/config";
import "./App.css";
import { ViewPdf } from "./components/Tasks/ViewPdf/ViewPdf";
import { CreateRoadmap } from "./components/Roadmaps/CreateRoadmap/CreateRoadmap";
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
import Appbar from "./pages/Appbar/Appbar";

function App() {

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
          {user ? <>
            <Tool_bar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/create" component={CreateRoadmap} />
              <Route exact path={`${Routes.boards}/:id`} component={RoadmapPage} />
              <Route exact path={`${Routes.explore}`} component={RecentRoadmaps} />
              <Route exact path={`${Routes.newBoard}`} component={NewPaper} />
              <Route exact path={`${Routes.pdf}/:id`} component={ViewPdf} />
              <Route exact path={`${Routes.learning}`} component={LearningRoadmaps} />
            </Switch>
          </>
            :
            <>
              <Appbar />
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/Login" component={LoginPage} />
                <Route exact path="/Register" component={RegisterPage} />
                <Route exact path="/ForgotPassword" component={ForgotPasswordPage} />
              </Switch>
            </>
          }
        </Router>
      </StylesProvider>
    </div>
  );
}

export default App;
