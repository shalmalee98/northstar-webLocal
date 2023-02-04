import React from "react";
import { Tool_bar } from "../../components/Toolbar/Tool_bar";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from "../LandingPage/components/LandingPage";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="toolbar">
                {/* <Too_lbar /> */}
            </div>
            <div className="body">
                <LandingPage />
            </div>
        </div>
    );
}
export default Dashboard;