import React from "react";
import argentBankLogo from "../img/argentBankLogo.png";
import "../index.css";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo" href="./index.html">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to="/user/login" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    );
}
