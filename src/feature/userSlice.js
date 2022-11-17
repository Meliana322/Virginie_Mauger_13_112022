import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: "",
        lastName: "",
    },
    reducers: {
        setFirstName: (state, { payload }) => {
            state.firstName = payload;
        },
        setLastName: (state, { payload }) => {
            state.lastName = payload;
        },

        setUser3: (state, { payload }) => {
            state.user = false;
        },
    },
});

export const { setFirstName, setLastName, setUser3 } = userSlice.actions;
export default userSlice.reducer;
