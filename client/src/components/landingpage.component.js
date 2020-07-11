import React from "react";
import Login from "./login.component";
import Register from "./register.component";
export default function LandingPage() {
    return (
        <>
            <div className="landing-page">
                <Login />
                <hr />
                <p>Or</p>
                <Register />
            </div>
        </>
    );
}
