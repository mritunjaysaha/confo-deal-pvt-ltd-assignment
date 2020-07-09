import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/AuthService";

export default function Register(props) {
    const [user, setUser] = useState({
        username: "",
        password: "",
        usertype: "",
    });
    // const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(function () {
        return function () {
            clearTimeout(timerID);
        };
    }, []);

    function onChange(e) {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function resetForm() {
        setUser({ username: "", password: "", usertype: "" });
    }

    function onSubmit(e) {
        e.preventsDefault();
        AuthService.register(user).then((data) => {
            const { message } = data;
            console.log({ message });
            console.log({ data });
            resetForm();
            // setMessage(message);
            if (message.msgError === false) {
                timerID = setTimeout(() => {
                    props.history.push("/login");
                }, 2000);
            }
        });
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <h3>Register</h3>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    placeholder="Enter username"
                />
                <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    placeholder="Enter password"
                />
                <input
                    type="text"
                    name="usertype"
                    value={user.usertype}
                    onChange={onChange}
                    placeholder="admin/normal user"
                />
                <button>Register</button>
            </form>
        </>
    );
}
