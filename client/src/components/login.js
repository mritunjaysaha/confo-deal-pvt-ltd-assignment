import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";

export default function Login(props) {
    const [user, setUser] = useState({ username: "", password: "" });
    // const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    function onChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    function resetForm() {
        setUser({ username: "", password: "" });
    }
    function onSubmit(e) {
        e.preventDefault();
        AuthService.login(user).then((data) => {
            console.log({ data });

            const [isAuthenticated, user, message] = data;
            console.log(message);
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                // props.history.push("/dashboard");
            } else {
                // setMessage(message);
                resetForm();
            }
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Log In</h3>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={onChange}
                placeholder="Enter Username"
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChange}
                placeholder="Enter password"
            />
            <button>Log In</button>
        </form>
    );
}
