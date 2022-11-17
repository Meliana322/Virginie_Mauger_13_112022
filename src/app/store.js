import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../feature/loginSlice";
import userReducer from "../feature/userSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
    },
});
export default store;
