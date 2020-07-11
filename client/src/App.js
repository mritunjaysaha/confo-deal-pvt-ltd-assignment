import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard.component";
import Navbar from "./components/navbar.component";
import LandingPage from "./components/landingpage.component";
import { set } from "idb-keyval";
import "./styles/main.css";
function App() {
    useEffect(function () {
        // Dummy data that is uploaded to IndexedDB everytime we run the command npm start
        // This data is displayed on the normal user's
        const courses = [
            {
                name: "Dummy Completed",
                status: "completed",
                points: 100,
                dueDate: Date.parse("20 July 2020 00:00:00 GMT"),
                dateOfCompletion: Date.parse("12 July 2020 00:00:00 GMT"),
            },
            {
                name: "Dummy Completed 1",
                status: "completed",
                points: 100,
                dueDate: Date.parse("20 July 2020 00:00:00 GMT"),
                dateOfCompletion: Date.parse("12 July 2020 00:00:00 GMT"),
            },
            {
                name: "Dummy Attempted",
                status: "attempted",
                points: 100,
                dueDate: Date.parse("20 July 2020 00:00:00 GMT"),
                dateOfCompletion: "",
            },
            {
                name: "Dummy Attempted 1",
                status: "attempted",
                points: 100,
                dueDate: Date.parse("20 July 2020 00:00:00 GMT"),
                dateOfCompletion: "",
            },
            {
                name: "Dummy todo",
                status: "todo",
                points: 100,
                dueDate: Date.parse("20 July 2020 00:00:00 GMT"),
                dateOfCompletion: "",
            },
            {
                name: "Dummy todo1",
                status: "todo",
                points: 100,
                dueDate: Date.parse("20 July 2020 00:00:00 GMT"),
                dateOfCompletion: "",
            },
        ];
        set("courses", courses);
    }, []);
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
