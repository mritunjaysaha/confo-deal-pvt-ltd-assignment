import React, { useState, useEffect } from "react";
import SimpleTabs from "./tabs.component";
import CourseDetails from "./course-details.component";
import { set, get } from "idb-keyval";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

// function CourseDetails(props) {
//     return (
//         <>
//             <p>{props.message}</p>
//             {props.flag === true ? (
//                 <div>
//                     <p>{props.name}</p>
//                     <p>{props.points}</p>
//                     <p>
//                         {props.dateDescription}: {props.date}
//                     </p>
//                     <button onClick={() => props.handle(props.name)}>
//                         Attempt
//                     </button>
//                 </div>
//             ) : null}
//         </>
//     );
// }
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});
export default function NormalDashboard() {
    const [courses, setCourses] = useState([]);
    const [currentDesktopTab, setcurrentDesktopTab] = useState(0);
    const [completed, setCompleted] = useState([]);
    const [attempted, setAttempted] = useState([]);
    const [todo, setTodo] = useState([]);
    const handleDesktopTabs = (event, newValue) => {
        setcurrentDesktopTab(newValue);
    };

    const classes = useStyles();

    useEffect(async function () {
        console.log("here");
        await get("courses").then((data) => {
            if (data != null) {
                console.log("data", data);
                setCourses(data);
            }
        });
    }, []);
    useEffect(
        function () {
            const c = [];
            const a = [];
            const t = [];
            console.log(
                "kjashdhjkahjfahdskhajkshfjsdahshakhskahklahkajksjklajklaj"
            );
            courses.map((course) => {
                console.log("here-----", course);

                if (course.status === "completed") {
                    console.log("completed");
                    c.push(course);
                }
                if (course.status === "attempted") {
                    console.log("attempted");
                    a.push(course);
                }
                if (course.status === "todo") {
                    console.log("todo");
                    t.push(course);
                }
            });

            setTimeout(() => {
                console.log("c", c);
                console.log("a", a);
                console.log("t", t);

                setCompleted(c);
                setAttempted(a);
                setTodo(t);
            }, 0);
        },
        [courses]
    );
    function CompletedCourses() {
        console.log("courses", courses);
        // const completed = courses.map((course) => {
        //     if (course.status === "completed") {
        //         return (
        //             <CourseDetails
        //                 name={course.name}
        //                 points={course.points}
        //                 dateDescription={"Completed on"}
        //                 date={course.dateOfCompletion.toUTCString()}
        //                 flag={true}
        //             />
        //         );
        //     }
        // });
        // if (completed.length > 0) {
        //     return completed;
        // }
        return <CourseDetails message={"No courses completed"} />;
    }
    function AttemptedCourse() {
        console.log({ courses });
        // const attempted = courses.map((course) => {
        //     if (course.status === "attempted") {
        //         return (
        //             <CourseDetails
        //                 name={course.name}
        //                 points={course.points}
        //                 dateDescription={"Due date"}
        //                 date={course.dueDate.toUTCString()}
        //                 flag={true}
        //             />
        //         );
        //     }
        // });
        // if (attempted.length > 0) {
        //     return attempted;
        // }
        return <CourseDetails message={"No courses in attempted list"} />;
    }

    function TodoCourse() {
        const todoData = (
            <>
                {todo.map((course) => {
                    return (
                        <CourseDetails
                            name={course.name}
                            points={course.points}
                            dateDescription={"Due date"}
                            date={course.dueDate.toUTCString()}
                            flag={true}
                            handle={handleTodos}
                        />
                    );
                })}
            </>
        );
        if (todo.length > 0) {
            return todoData;
        }
        return <CourseDetails message={"No pending courses"} />;
    }

    function handleTodos(key) {
        console.log("clicked");
        console.log("key", key);
        console.log(todo);

        courses.map((course) => {
            if (course.name === key) {
                course.status = "attempted";
            }
        });

        set("courses", courses);

        const filteredTodo = todo.filter((to) => to.name !== key);
        console.log("filteredTodo", filteredTodo);

        setTodo(filteredTodo);
    }

    // const pathMap = ["/dashboard", "/attempted", "/todo"];
    return (
        <>
            <p>Normal user</p>
            <SimpleTabs
                completed={CompletedCourses}
                attempted={AttemptedCourse}
                todo={TodoCourse}
            />
            {/* <BrowserRouter>
                <Paper className={classes.root}>
                    <Tabs
                        value={currentDesktopTab}
                        onChange={handleDesktopTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Active" component={Link} to={pathMap[0]} />
                        <Tab
                            label="Completed"
                            component={Link}
                            to={pathMap[1]}
                        />
                        <Tab label="Missed" component={Link} to={pathMap[2]} />
                    </Tabs>
                </Paper>

                <Switch>
                    <Route
                        exact
                        path={pathMap[0]}
                        component={CompletedCourses}
                    />
                    <Route path={pathMap[1]} component={AttemptedCourse} />
                    <Route path={pathMap[2]} component={TodoCourse} />
                </Switch>
            </BrowserRouter> */}
        </>
    );
}
