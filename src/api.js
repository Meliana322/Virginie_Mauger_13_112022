import store from "./app/store";

export function getUserInfo(token) {
    const url = "http://localhost:3001/api/v1/user/profile";
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => response.json());
}
export function postUserInfo(firstName, lastName) {
    const url = "http://localhost:3001/api/v1/user/profile";
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ firstName, lastName }),
    }).then((response) => response.json());
}
