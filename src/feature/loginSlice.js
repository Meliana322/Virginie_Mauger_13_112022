import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        Authorization: null,
        token: null,
        remember: false,
    },
    reducers: {
        setLogout: (state, { payload }) => {
            state.Authorization = false;
        },
        setLoginSuccessFul: (state, { payload }) => {
            state.Authorization = true;
        },

        setLoginError: (state, { payload }) => {
            state.Authorization = false;
        },
        setRememberCheckbox: (state, { payload }) => {
            state.remember = false;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
    },
});

export const {
    setLogout,
    setLoginSuccessFul,
    setLoginError,
    setRememberCheckbox,
    setToken,
} = loginSlice.actions;
export default loginSlice.reducer;
