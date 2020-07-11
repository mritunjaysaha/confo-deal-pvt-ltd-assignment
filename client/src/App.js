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
                key: "1",
                points: 100,
                completed: true,
                attempted: false,
                todo: false,
                dueDate: new Date(Date.UTC(2020, 6, 20)),
                dateOfCompletion: new Date(Date.UTC(2020, 6, 10)),
            },
            {
                name: "Dummy Completed 1",
                status: "completed",
                key: "2",
                points: 100,
                completed: true,
                attempted: false,
                todo: false,
                dueDate: new Date(Date.UTC(2020, 6, 20)),
                dateOfCompletion: new Date(Date.UTC(2020, 6, 10)),
            },
            {
                name: "Dummy Attempted",
                status: "attempted",
                key: "3",
                points: 100,
                completed: false,
                attempted: true,
                todo: false,
                dueDate: new Date(Date.UTC(2020, 7, 20)),
                dateOfCompletion: "",
            },
            {
                name: "Dummy Attempted 1",
                status: "attempted",
                key: "4",
                points: 100,
                completed: false,
                attempted: true,
                todo: false,
                dueDate: new Date(Date.UTC(2020, 6, 20)),
                dateOfCompletion: "",
            },
            {
                name: "Dummy todo",
                status: "todo",
                key: "5",
                points: 100,
                completed: false,
                attempted: false,
                todo: true,
                dueDate: new Date(Date.UTC(2020, 6, 20)),
                dateOfCompletion: "",
            },
            {
                name: "Dummy todo1",
                status: "todo",
                key: "6",
                points: 100,
                completed: false,
                attempted: false,
                todo: true,
                dueDate: new Date(Date.UTC(2020, 6, 20)),
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
