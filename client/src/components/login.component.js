import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import Message from "./mesage.component";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        AuthService.login(user).then((data) => {
            console.log("data: ", data);
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                localStorage.setItem("username", user);
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                // props.history.push("/dashboard");
            } else {
                setMessage(message);
                resetForm();
            }
        });
    };

    const resetForm = () => {
        setUser({ username: "", password: "" });
    };
    return (
        <>
            <div className="form">
                <h3>Login</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={onChange}
                        placeholder="Enter username"
                    />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="Enter password"
                    />
                    <button>Log in</button>
                </form>
                {message ? <Message message={message} /> : null}
            </div>
        </>
    );
};

export default Login;
