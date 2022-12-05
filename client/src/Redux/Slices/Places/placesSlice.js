import { createSlice } from "@reduxjs/toolkit";

export const placesSlice = createSlice({
    name: "places",
    initialState: {
        places: []
    },

    reducers: {
        getAllPlaces: (state, action) => {
            state.places = action.payload;
        },
    },
});

export const { getAllPlaces } = placesSlice.actions;

export default placesSlice.reducer;
