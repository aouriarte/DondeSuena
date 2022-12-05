import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
    name: "genres",
    initialState: {
        genres: []
    },

    reducers: {
        getAllGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

export const { getAllGenres } = genresSlice.actions;

export default genresSlice.reducer;
