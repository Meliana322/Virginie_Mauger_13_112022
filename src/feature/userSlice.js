import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: "",
        lastName: "",
        editName: false,
    },
    reducers: {
        setFirstName: (state, { payload }) => {
            state.firstName = payload;
        },
        setLastName: (state, { payload }) => {
            state.lastName = payload;
        },
        setEditName: (state, { payload }) => {
            state.editName = false;
        },
    },
});

export const { setFirstName, setLastName, setEditName } = userSlice.actions;
export default userSlice.reducer;
