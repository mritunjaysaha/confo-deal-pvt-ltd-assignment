import React, { useState, useEffect } from "react";
import SimpleTabs from "./tabs.component";
import CourseDetails from "./course-details.component";
export default function NormalDashboard() {
    const courses = [
        {
            name: "Dummy Completed",
            points: 100,
            completed: true,
            attempted: false,
            todo: false,
            dueDate: new Date(Date.UTC(2020, 6, 20)),
            dateOfCompletion: new Date(Date.UTC(2020, 6, 10)),
        },
        {
            name: "Dummy Completed 1",
            points: 100,
            completed: true,
            attempted: false,
            todo: false,
            dueDate: new Date(Date.UTC(2020, 6, 20)),
            dateOfCompletion: new Date(Date.UTC(2020, 6, 10)),
        },
        {
            name: "Dummy Attempted",
            points: 100,
            completed: false,
            attempted: true,
            todo: false,
            dueDate: new Date(Date.UTC(2020, 7, 20)),
            dateOfCompletion: "",
        },
        {
            name: "Dummy Attempted 1",
            points: 100,
            completed: false,
            attempted: true,
            todo: false,
            dueDate: new Date(Date.UTC(2020, 6, 20)),
            dateOfCompletion: "",
        },
        {
            name: "Dummy todo",
            points: 100,
            completed: false,
            attempted: false,
            todo: true,
            dueDate: new Date(Date.UTC(2020, 6, 20)),
            dateOfCompletion: "",
        },
        {
            name: "Dummy todo1",
            points: 100,
            completed: false,
            attempted: false,
            todo: true,
            dueDate: new Date(Date.UTC(2020, 6, 20)),
            dateOfCompletion: "",
        },
    ];

    function CompletedCourses() {
        console.log({ courses });
        const completed = courses.map((course) => {
            if (course.completed === true) {
                return (
                    <CourseDetails
                        name={course.name}
                        points={course.points}
                        dateDescription={"Completed on"}
                        date={course.dateOfCompletion.toUTCString()}
                    />
                );
            }
        });

        return completed;
    }

    function AttemptedCourse() {
        console.log({ courses });
        const attempted = courses.map((course) => {
            if (course.attempted === true) {
                return (
                    <CourseDetails
                        name={course.name}
                        points={course.points}
                        dateDescription={"Due date"}
                        date={course.dueDate.toUTCString()}
                    />
                );
            }
        });
        return attempted;
    }

    function TodoCourse() {
        const todo = courses.map((course) => {
            if (course.todo === true) {
                return (
                    <CourseDetails
                        name={course.name}
                        points={course.points}
                        dateDescription={"Due date"}
                        date={course.dueDate.toUTCString()}
                    />
                );
            }
        });
        return todo;
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
