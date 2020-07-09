import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard.component";
import Navbar from "./components/navbar.component";

function App() {
    return (
        <Router>
            <Navbar />
            <Route path="/dashboard" component={Dashboard} />
        </Router>
    );
}

export default App;
