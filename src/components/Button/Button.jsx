import React from "react";
import "../../index.css";
import style from "./Button.module.css";

export default function Button(props) {
    return (
        <>
            <button
                className={style.sign_in_button}
                type={props.type || "button"}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </>
    );
}
