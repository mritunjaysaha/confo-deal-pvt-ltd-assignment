import React, { useEffect } from "react";
import AuthService from "../services/AuthService";

export default function Dashboard() {
    const username = localStorage.getItem("username");

    useEffect(function () {
        console.log("use effect");
        AuthService.getUsertype(username)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err.message));
    });
    return (
        <>
            <h3>Dashboard</h3>
        </>
    );
}
