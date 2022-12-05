import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
    name: "team",
    initialState: {
        team: [],
    },
    reducers: {
        getAllTeam: (state, action) => {
            state.team = action.payload;
        },
    },
});
export const { getAllTeam } = teamSlice.actions;

export default teamSlice.reducer;
