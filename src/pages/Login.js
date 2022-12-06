import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { setLoginSuccessFul, setToken } from "../feature/loginSlice";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const checkboxRef = useRef();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
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

        if (checkboxRef.current.checked) {
            localStorage.setItem("userEmail", enteredEmail);
        } else {
            localStorage.clear();
        }
        console.log(enteredEmail, enteredPassword);

        // Pour se connecter pour récupérer le UserId et le token d'authentification
        const url = "http://localhost:3001/api/v1/user/login";

        setIsLoading(true);
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
            .then((response) => {
                if (!response.ok) {
                    // setError({
                    //     title: "",
                    //     message: "Erreur d'identification",
                    // });
                    // throw new Error("test msg");
                    throw new Error();
                }
                return response.json();
            })
            .then((data) => {
                dispatch(setLoginSuccessFul());
                dispatch(setToken(data.body.token));
                localStorage.setItem("token", data.body.token);
                localStorage.setItem("email", data.body.email);
                setIsLoading(false);
                navigate("/user/profile");
            })
            .catch((err) => {
                setIsLoading(false);
                // if (error?.response?.status === 400) {
                // dispatch(setLoginError("Erreur d'identification"));
                setError({
                    title: "",
                    message: "Erreur d'identification",
                });
                // } else {
                //     // dispatch(
                //     //     setLoginError(
                //     //         "Oups! Connexion impossible. Veuillez réesayer plus tard."
                //     //     )
                //     // );

                //     console.log(2);
                // }
            });

        // pour vide les champs
        // emailInputRef.current.value = "";
        // passwordInputRef.current.value = "";
    };

    const errorHandler = (event) => {
        setError(null);
    };

    return (
        <>
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
                            <label htmlFor="username">Username</label>
                            {/* Lorsque je me deconnecte si state remember me est a true alors affiche imput.value = email */}
                            <input
                                defaultValue={localStorage.getItem("userEmail")}
                                type="text"
                                id="username"
                                ref={emailInputRef}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="current-password"
                                id="password"
                                ref={passwordInputRef}
                            />
                        </div>
                        <div className="input-remember">
                            <input
                                ref={checkboxRef}
                                type="checkbox"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <Button
                            disabled={isLoading}
                            type={"submit"}
                            onClick={() => {}}
                        >
                            Sign In
                        </Button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}
