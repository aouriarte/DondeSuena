import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: [],
        addFav: [],
    },

    reducers: {
        getAllFavs: (state, action) => {
            state.favorites = action.payload;
        },
        addFav: (state, action) => {
            state.addFav = action.payload;
        },
        deleteFav: (state, action) => {
            state.favorites = action.payload;
        },
    },
});

export const { getAllFavs, addFav, deleteFav } = favoritesSlice.actions;

export default favoritesSlice.reducer;
