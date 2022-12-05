import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
    name: "profile",

    initialState: {
        profileUserState: false,
        profileArtistState: 1,
    },

    reducers: {
        setTogleUserState: (state, action) => {
            state.profileUserState = action.payload;
        },
        setTogleArtistState: (state, action) => {
            state.profileArtistState = action.payload;
        },
    },
});

export const { setTogleUserState, setTogleArtistState } = ProfileSlice.actions;

export default ProfileSlice.reducer;
