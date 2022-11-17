import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    setLoginSuccessFul,
    setLoginError,
    setToken,
} from "../feature/loginSlice";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const isLoggedIn = true;

    const [isLogin, setIsLogin] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // controler si erreur a true ou false

    if (error) {
        console.log("true");
    } else {
        console.log("false");
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // contrôle input pas vide
        if (
            enteredEmail.trim().length === 0 ||
            enteredPassword.trim().length === 0
        ) {
            setError({
                title: "Un ou plusieurs champs sont vides",
                message: "Entrer votre email et/ou votre mot de passe",
            });
            return;
        }

        // contrôle validité email
        const regExEmail = (value) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        };

        if (!regExEmail(enteredEmail)) {
            setError({
                title: "Email invalide",
                message: "Entrer un format de mail valide",
            });
            return;
        }

        console.log(enteredEmail, enteredPassword);

        // Pour se connecter pour récupérer le UserId et le token d'authentification
        const url = "http://localhost:3001/api/v1/user/login";

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // setData(data);
                dispatch(setLoginSuccessFul());
                dispatch(setToken(data.body.token));
                navigate("/user/profile");
            })
            .catch((err) => {
                if (error.response.status === 400) {
                    dispatch(setLoginError("Erreur d'identification"));
                } else {
                    dispatch(
                        setLoginError(
                            "Oups! Connexion impossible. Veuillez réesayer plus tard."
                        )
                    );
                    console.log(error);
                }
            });

        // pour vide les champs
        // emailInputRef.current.value = "";
        // passwordInputRef.current.value = "";
    };

    // console.log(data);

    const errorHandler = (event) => {
        setError(null);
    };

    return (
        <>
            {/* {isLoggedIn && <p>Vous etes connecté</p>}
            {!isLoggedIn && <p>Vous n'etes pas connecté</p>}
            {isLoggedIn && <p>Votre token : </p>}
            {isLoggedIn && <p>Votre userId : </p>}
            {isLoggedIn && <p>Se déconnecter </p>}
            {isLoggedIn && <Button>Se déconnecter</Button>} */}
            <Header />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    {error && (
                        <ErrorModal
                            title={error.title}
                            message={error.message}
                            onConfirm={errorHandler}
                        />
                    )}
                    <form onSubmit={submitHandler}>
                        <div className="input-wrapper">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                ref={emailInputRef}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label for="password">Password</label>
                            <input
                                type="current-password"
                                id="password"
                                ref={passwordInputRef}
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <Button type={"submit"} onClick={() => {}}>
                            Sign In
                        </Button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}
