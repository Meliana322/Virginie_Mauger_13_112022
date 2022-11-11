import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import * as APIServer from "../api";
// import * as APIMock from "../apiMock";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const API = process.env.REACT_APP_ISMOCKACTIVE === "true" ? APIMock : APIServer;

export default function Login(props) {
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    useEffect(() => {
        fetch("data.json")
            .then((resp) => resp.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <>
            <Header />
            <Login />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label for="username">{props.email}</label>
                            <input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label for="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}
