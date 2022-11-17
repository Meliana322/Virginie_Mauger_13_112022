// import Axios from "axios";
import store from "./app/store";

export function getUserInfo(token) {
    const url = "http://localhost:3001/api/v1/user/profile";
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.getState().login.token}`,
        },
    }).then((response) => response.json());
}
