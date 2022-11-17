import React from "react";
import style from "./ErrorModal.module.css";
import Button from "../Button/Button";

export default function ErrorModal(props) {
    return (
        <div className={style.backdrop} onClick={props.onConfirm}>
            <div className={style.container}>
                <header>
                    <h2 className={style.title}>{props.title}</h2>
                </header>
                <div>
                    <p className={style.message}>{props.message}</p>
                </div>
                <footer className={style.footer}>
                    <Button onClick={props.onConfirm}>OK</Button>
                </footer>
            </div>
        </div>
    );
}
