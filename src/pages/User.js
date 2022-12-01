import { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { setEditName, setFirstName, setLastName } from "../feature/userSlice";
import { getUserInfo, postUserInfo } from "../api";
import Button from "../components/Button/Button";

export default function User() {
    const [isOpen, setIsOpen] = useState(false);
    let getFirstName = (state) => state.user.firstName;
    const firstName = useSelector(getFirstName);

    const getLastName = (state) => state.user.lastName;
    const lastName = useSelector(getLastName);

    const dispatch = useDispatch();
    let firstNameInputRef = useRef();
    const lastNameInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        postUserInfo(
            firstNameInputRef.current.value === ""
                ? firstName
                : firstNameInputRef.current.value,
            lastNameInputRef.current.value === ""
                ? lastName
                : lastNameInputRef.current.value
        )
            .then(getUserInfo)
            .then((data) => {
                console.log(data);
                dispatch(setFirstName(data.body.firstName));
                dispatch(setLastName(data.body.lastName));
            });

        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        console.log(enteredFirstName, enteredLastName);
    };

    // const formReset = (event) => {};

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
                    <button
                        className="edit-button"
                        onClick={() => {
                            setIsOpen((prevIsOpen) => !prevIsOpen);
                        }}
                    >
                        Edit Name
                    </button>
                </div>
                {isOpen && (
                    <div className="header">
                        <form onSubmit={submitHandler}>
                            <h1>Welcome back</h1>
                            <input
                                className="edit-input name"
                                autoComplete="off"
                                type="text"
                                placeholder={firstName}
                                ref={firstNameInputRef}
                            />
                            <input
                                className="edit-input name"
                                autoComplete="off"
                                type="text"
                                placeholder={lastName}
                                ref={lastNameInputRef}
                            />
                            <br /> <br />
                            <Button className="edit-button" type={"submit"}>
                                Save
                            </Button>
                            <Button
                                className="cancel-button"
                                onClick={() => {
                                    setIsOpen((prevIsOpen) => !prevIsOpen);
                                }}
                            >
                                Cancel
                            </Button>
                        </form>
                    </div>
                )}

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
