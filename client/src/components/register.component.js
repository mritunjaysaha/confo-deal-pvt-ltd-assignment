import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/AuthService";
import Message from "./mesage.component";
const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        usertype: "",
    });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setUser({ username: "", password: "", usertype: "" });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.register(user).then((data) => {
            const { message } = data;
            console.log("data: ", data);
            resetForm();
            setMessage(message);
            if (message.msgError === false) {
                timerID = setTimeout(() => {
                    // props.history.push("/dashboard");
                }, 2000);
            }
        });
    };

    return (
        <div className="form">
            <h3>Sign Up</h3>

            <form onSubmit={onSubmit}>
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
                    placeholder="Enter Password"
                />
                <input
                    type="text"
                    name="usertype"
                    value={user.usertype}
                    onChange={onChange}
                    placeholder="normal / admin"
                />
                <button>Sign Up</button>
                {message ? <Message message={message} /> : null}
            </form>
        </div>
    );
};

export default Register;
