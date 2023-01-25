import React from "react";
import { Toolbar } from "../../components/Toolbar/Toolbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from "../LandingPage/LandingPage";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="toolbar">
                {/* <Toolbar /> */}
            </div>
            <div className="body">
                <LandingPage />
            </div>
        </div>
    );
}
export default Dashboard;