import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import NormalDashboard from "./normal-user-dashboard";
import AdminDashboard from "./admin-dashboard";
export default function Dashboard() {
    const username = localStorage.getItem("username");
    const [usertype, setUsertype] = useState("");
    useEffect(function () {
        console.log("use effect");
        AuthService.getUsertype(username)
            .then((data) => {
                localStorage.setItem("usertype", data);
                setUsertype(data);
            })
            .catch((err) => console.log(err.message));
    }, []);

    let dashboard;
    if (usertype === "admin") {
        dashboard = <AdminDashboard />;
    } else {
        dashboard = <NormalDashboard />;
    }
    return (
        <>
            <p>dashboard</p>
            {dashboard}
        </>
    );
}
