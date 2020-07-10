import React, { useState, useEffect } from "react";
import SimpleTabs from "./tabs.component";
import CourseDetails from "./course-details.component";
import { set, get } from "idb-keyval";
export default function NormalDashboard() {
    const [courses, setCourses] = useState([]);

    useEffect(async function () {
        console.log("here");
        await get("courses").then((data) => {
            if (data != null) {
                console.log("data", data);
                setCourses(data);
            }
        });
    }, []);

    function CompletedCourses() {
        console.log({ courses });
        const completed = courses.map((course) => {
            if (course.status === "completed") {
                return (
                    <CourseDetails
                        name={course.name}
                        points={course.points}
                        dateDescription={"Completed on"}
                        date={course.dateOfCompletion.toUTCString()}
                        flag={true}
                    />
                );
            }
        });
        if (completed.length > 0) {
            return completed;
        }
        return <CourseDetails message={"No courses completed"} />;
    }
    function AttemptedCourse() {
        console.log({ courses });
        const attempted = courses.map((course) => {
            if (course.status === "attempted") {
                return (
                    <CourseDetails
                        name={course.name}
                        points={course.points}
                        dateDescription={"Due date"}
                        date={course.dueDate.toUTCString()}
                        flag={true}
                    />
                );
            }
        });
        if (attempted.length > 0) {
            return attempted;
        }
        return <CourseDetails message={"No courses in attempted list"} />;
    }
    function TodoCourse() {
        const todo = courses.map((course) => {
            if (course.status === "todo") {
                return (
                    <CourseDetails
                        name={course.name}
                        points={course.points}
                        dateDescription={"Due date"}
                        date={course.dueDate.toUTCString()}
                        flag={true}
                    />
                );
            }
        });
        if (todo.length > 0) {
            return todo;
        }
        return <CourseDetails message={"No pending courses"} />;
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
