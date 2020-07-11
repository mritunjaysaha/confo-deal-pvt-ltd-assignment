import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import Button from "@material-ui/core/Button";
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
    }, []);
    const history = useHistory();
    if (isAuthenticated) {
        history.push("/dashboard");
    }
    function onClickLogoutHandler() {
        AuthService.logout().then((data) => {
            if (data.success) {
                console.log("data", data);
                setIsAuthenticated(false);
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
        return (
            <>
                <Redirect to="/dashboard" />
                <div className="navbar-contents">
                    <Button variant="contained" onClick={onClickLogoutHandler}>
                        <Link className="logout-link" to="/">
                            Logout
                        </Link>
                    </Button>
                    {usertype === "normal" ? <UserDetails /> : null}
                </div>
            </>
        );
    }

    function UserDetails() {
        return (
            <>
                <div className="navbar-contents-description">
                    <p>{username}</p>
                    <p>{lastLogin}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="navbar">
                <h3 className="logo">BlueTech</h3>
                <nav>
                    {!isAuthenticated
                        ? unauthenticatedNavBar()
                        : authenticatedNavBar()}
                </nav>
            </div>
        </>
    );
};

export default Navbar;
