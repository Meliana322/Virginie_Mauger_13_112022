import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { setFirstName, setLastName } from "../feature/userSlice";
import { getUserInfo } from "../api";
export default function User() {
    const getFirstName = (state) => state.user.firstName;
    const getLastName = (state) => state.user.lastName;
    const firstName = useSelector(getFirstName);
    const lastName = useSelector(getLastName);
    const dispatch = useDispatch();

    getUserInfo()
        .then((data) => {
            console.log(data);
            dispatch(setFirstName(data.body.firstName));
            dispatch(setLastName(data.body.lastName));
        })
        .catch((err) => {
            if (err.response.status === 400) {
                // dispatch(setLoginError("Erreur d'identification"));
            } else {
                // dispatch(
                //     setLoginError(
                //         "Oups! Connexion impossible. Veuillez réesayer plus tard."
                //     )
                // );
                // console.log(error);
            }
        });

    // pour vide les champs
    // emailInputRef.current.value = "";
    // passwordInputRef.current.value = "";

    return (
        <>
            <Header />
            <main className="main bg-dark">
                <div className="header">
                    <h1>
                        Welcome back
                        <div>
                            <pre>
                                {firstName} {lastName}
                            </pre>
                        </div>
                    </h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">
                            Argent Bank Checking (x8349)
                        </h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">
                            Available Balance
                        </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">
                            View transactions
                        </button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">
                            Argent Bank Savings (x6712)
                        </h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">
                            Available Balance
                        </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">
                            View transactions
                        </button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">
                            Argent Bank Credit Card (x5201)
                        </h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">
                            Current Balance
                        </p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">
                            View transactions
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
