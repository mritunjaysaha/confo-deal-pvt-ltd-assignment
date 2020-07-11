import React, { useState, useEffect } from "react";
import SimpleTabs from "./tabs.component";
import CourseDetails from "./course-details.component";
import { set, get } from "idb-keyval";

export default function NormalDashboard() {
    const [courses, setCourses] = useState([]);

    const [completed, setCompleted] = useState([]);
    const [attempted, setAttempted] = useState([]);
    const [todo, setTodo] = useState([]);

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
        const completedData = (
            <>
                {completed.map((course) => {
                    if (course.status === "completed") {
                        return (
                            <CourseDetails
                                for="completed"
                                name={course.name}
                                points={course.points}
                                dateDescription={"Completed on"}
                                date={course.dateOfCompletion}
                                flag={true}
                            />
                        );
                    }
                })}
            </>
        );
        if (completed.length > 0) {
            return completedData;
        }
        return <CourseDetails message={"No courses completed"} />;
    }
    function AttemptedCourse() {
        console.log({ courses });
        const attemptedData = (
            <>
                {attempted.map((course) => {
                    if (course.status === "attempted") {
                        return (
                            <CourseDetails
                                for="attempted"
                                name={course.name}
                                points={course.points}
                                dateDescription={"Due date"}
                                date={course.dueDate.toUTCString()}
                                flag={true}
                                clickAttempt={handleAttempted}
                            />
                        );
                    }
                })}
            </>
        );
        if (attempted.length > 0) {
            return attemptedData;
        }
        return <CourseDetails message={"No courses in attempted list"} />;
    }
    function handleAttempted(key) {
        console.log("clicked");
        console.log("key", key);
        console.log(todo);
        let completedData = completed;

        courses.map((course) => {
            if (course.name === key) {
                course.status = "completed";
                course.dateOfCompletion = Date.now();
                completedData = [...completedData, course];
            }
        });

        const filteredAttempted = attempted.filter((data) => data.name !== key);
        console.log("filteredAttempted", filteredAttempted);
        console.log("completed", completed);
        console.log("completedData", completedData);
        setCompleted(completedData);
        setAttempted(filteredAttempted);
        set("courses", courses);
    }
    function TodoCourse() {
        const todoData = (
            <>
                {todo.map((course) => {
                    return (
                        <CourseDetails
                            for="todo"
                            name={course.name}
                            points={course.points}
                            dateDescription={"Due date"}
                            date={course.dueDate.toUTCString()}
                            flag={true}
                            clickTodo={handleTodos}
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

        let attemptedData = attempted;
        courses.map((course) => {
            if (course.name === key) {
                course.status = "attempted";
                attemptedData = [...attemptedData, course];
            }
        });

        set("courses", courses);
        const filteredTodo = todo.filter((data) => data.name !== key);
        console.log("filteredTodo", filteredTodo);
        // setAttempted(attemptedData);
        console.log("attemptedData", attemptedData);
        setAttempted(attemptedData);
        console.log("attempted", attempted);
        setTodo(filteredTodo);
    }

    return (
        <>
            <p>Normal user</p>
            <SimpleTabs
                completed={CompletedCourses}
                attempted={AttemptedCourse}
                todo={TodoCourse}
            />
        </>
    );
}
