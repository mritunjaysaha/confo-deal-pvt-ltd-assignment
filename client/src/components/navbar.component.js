import React, { useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import LandingPage from "./landingpage.component";
import DashBoard from "./dashboard.component";
const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
        AuthContext
    );

    const history = useHistory();
    if (isAuthenticated) {
        history.push("/dashboard");
    }
    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                history.push("/");
            }
        });
    };

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
