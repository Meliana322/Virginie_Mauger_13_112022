import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import Error from "./pages/Error";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/user/login" element={<Login />}></Route>
                <Route path="/user/profile" element={<User />}></Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
