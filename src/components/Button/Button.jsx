import React from "react";
import "../../index.css";
import style from "./Button.module.css";

export default function Button(props) {
    return (
        <>
            <button
                disabled={props.disabled}
                className={style.sign_in_button}
                type={props.type || "button"}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </>
    );
}
