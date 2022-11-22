import React from "react";
import { useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import Error from "./pages/Error";
import { getUserInfo } from "./api";
import { setLoginSuccessFul } from "../src/feature/loginSlice";
// import ProtectedRoute from "./ProtectedRoute";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    return token === null ? <Navigate to="/user/login" /> : children;
}

function App() {
    return (
        <Router>
            <TokenRefresh />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/user/login" element={<Login />}></Route>
                <Route
                    path="/user/profile"
                    element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    }
                ></Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

const TokenRefresh = () => {
    const dispatch = useDispatch();
    if (localStorage.getItem("token")) {
        dispatch(setLoginSuccessFul());
        getUserInfo(dispatch);
    }
};

export default App;
