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
            dateOfCompletion: Date.now(),
            dueDate: new Date("July 20"),
        },
        {
            name: "Dummy Completed 1",
            points: 100,
            completed: true,
            attempted: false,
            todo: false,
            dueDate: new Date("July 20"),
            dateOfCompletion: Date.now(),
        },
        {
            name: "Dummy Attempted",
            points: 100,
            completed: false,
            attempted: true,
            todo: false,
            dueDate: new Date(Date.UTC(2020, 7, 20)),
            dateOfCompletion: Date.now(),
        },
        {
            name: "Dummy Attempted 1",
            points: 100,
            completed: false,
            attempted: true,
            todo: false,
            dueDate: new Date("July 20"),
            dateOfCompletion: Date.now(),
        },
        {
            name: "Dummy todo",
            points: 100,
            completed: false,
            attempted: false,
            todo: true,
            dueDate: new Date("July 20"),
            dateOfCompletion: Date.now(),
        },
        {
            name: "Dummy todo1",
            points: 100,
            completed: false,
            attempted: false,
            todo: true,
            dueDate: new Date("July 20"),
            dateOfCompletion: Date.now(),
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
                        date={course.dateOfCompletion}
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
                        // points={course.points}
                        dateDescription={"Due date"}
                        // date={new Date(Date.UTC(2020, 7, 20))}
                    />
                );
            }
        });
        return attempted;
    }
    return (
        <>
            <p>Normal user</p>
            <SimpleTabs
                completed={CompletedCourses}
                attempted={AttemptedCourse}
            />
        </>
    );
}
