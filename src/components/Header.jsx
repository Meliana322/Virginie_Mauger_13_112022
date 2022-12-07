import React from "react";
import argentBankLogo from "../img/argentBankLogo.png";
import "../index.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../feature/loginSlice";
import { setEditName } from "../feature/userSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { Authorization } = useSelector((state) => state.login);
    const { firstName } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(setLogout());
        dispatch(setEditName());
        localStorage.removeItem("token");
    };
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
                {Authorization ? (
                    <>
                        <Link to="/user/profile" className="main-nav-item name">
                            <i className="fa fa-user-circle"></i>
                            {firstName}
                        </Link>
                        <Link
                            to="/user/login"
                            onClick={handleLogout}
                            className="main-nav-item logoutButton"
                        >
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link to="/user/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
