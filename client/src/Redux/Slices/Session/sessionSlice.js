import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: "session",
    initialState: {
        user: { isLogged: false },
    },
    reducers: {
        logUser: (state, action) => {
            state.user = { isLogged: true, ...action.payload };
        },
        logoutUser: (state, action) => {
            state.user = { isLogged: false };
        },
    },
});

export const { logUser, logoutUser } = sessionSlice.actions;
export default sessionSlice.reducer;
