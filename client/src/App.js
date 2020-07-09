import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard.component";
import Navbar from "./components/navbar.component";
import LandingPage from "./components/landingpage.component";
function App() {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={LandingPage} />
            <Route path="/dashboard" component={Dashboard} />
        </Router>
        // <>hello world</>
    );
}

export default App;
