import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
// import LandingPage from "./landingpage.component";
// import DashBoard from "./dashboard.component";
const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
        AuthContext
    );
    const [username, setUsername] = useState("");
    const [usertype, setUsertype] = useState("");
    const [lastLogin, setLastLogin] = useState("");

    useEffect(function () {
        const username = localStorage.getItem("username");
        const usertype = localStorage.getItem("usertype");

        if (username != null && usertype != null) {
            setUsername(username);
            setUsertype(usertype);
            console.log(username);
            AuthService.getLastLogin(username)
                .then((data) => {
                    setLastLogin(new Date(data).toLocaleString());
                })
                .catch((err) => console.log(err.message));
        }
    });
    const history = useHistory();
    if (isAuthenticated) {
        history.push("/dashboard");
    }
    function onClickLogoutHandler() {
        AuthService.logout().then((data) => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                history.push("/");
            }
        });
    }

    function unauthenticatedNavBar() {
        return (
            <>
                <Redirect to="/" />
            </>
        );
    }

    function authenticatedNavBar() {
        console.log(isAuthenticated);

        return (
            <>
                <Redirect to="/dashboard" />
                <button type="button" onClick={onClickLogoutHandler}>
                    <Link to="/">Logout</Link>
                </button>
                {usertype === "normal" ? <UserDetails /> : null}
            </>
        );
    }

    function UserDetails() {
        return (
            <>
                <p>{username}</p>
                <p>{lastLogin}</p>
            </>
        );
    }

    return (
        <>
            <h3>BlueTech</h3>
            <nav>
                {!isAuthenticated
                    ? unauthenticatedNavBar()
                    : authenticatedNavBar()}
            </nav>
        </>
    );
};

export default Navbar;
