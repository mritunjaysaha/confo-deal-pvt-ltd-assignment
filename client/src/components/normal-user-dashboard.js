import React, { useState, useEffect } from "react";
import SimpleTabs from "./tabs.component";
import CourseDetails from "./course-details.component";
import { set, get } from "idb-keyval";

export default function NormalDashboard() {
    const [courses, setCourses] = useState([]);

    const [completed, setCompleted] = useState([]);
    const [attempted, setAttempted] = useState([]);
    const [todo, setTodo] = useState([]);
    const [points, setPoints] = useState(0);
    useEffect(async function () {
        await get("courses").then((data) => {
            if (data != null) {
                setCourses(data);
            }
        });
    }, []);
    useEffect(
        function () {
            const c = [];
            const a = [];
            const t = [];
            courses.map((course) => {
                if (course.status === "completed") {
                    c.push(course);
                }
                if (course.status === "attempted") {
                    a.push(course);
                }
                if (course.status === "todo") {
                    t.push(course);
                }
            });

            setTimeout(() => {
                setCompleted(c);
                setAttempted(a);
                setTodo(t);
            }, 0);
        },
        [courses]
    );
    function CompletedCourses() {
        let completedPoints = 0;
        const completedData = (
            <>
                {completed.map((course) => {
                    if (course.status === "completed") {
                        completedPoints += course.points;
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
            console.log("points: ", completedPoints);
            set("points", completedPoints);
            setPoints(completedPoints);
            return completedData;
        }
        return <CourseDetails message={"No courses completed"} />;
    }
    function AttemptedCourse() {
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
                                date={course.dueDate}
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
        let completedData = completed;

        courses.map((course) => {
            if (course.name === key) {
                course.status = "completed";
                course.dateOfCompletion = Date.now();
                setPoints(points + course.points);
                set("points", points);
                completedData = [...completedData, course];
            }
        });

        const filteredAttempted = attempted.filter((data) => data.name !== key);
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
                            date={course.dueDate}
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
        let attemptedData = attempted;
        courses.map((course) => {
            if (course.name === key) {
                course.status = "attempted";
                attemptedData = [...attemptedData, course];
            }
        });

        set("courses", courses);
        const filteredTodo = todo.filter((data) => data.name !== key);
        setAttempted(attemptedData);
        setTodo(filteredTodo);
    }

    return (
        <>
            <SimpleTabs
                completed={CompletedCourses}
                points={points}
                attempted={AttemptedCourse}
                todo={TodoCourse}
            />
        </>
    );
}
