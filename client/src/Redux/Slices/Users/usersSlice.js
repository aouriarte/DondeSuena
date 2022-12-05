import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "usersAdmin",
    initialState: {
        users: [],
    },

    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { getUsers } = userSlice.actions;

export default userSlice.reducer;
