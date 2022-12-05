import { createSlice } from "@reduxjs/toolkit";

export const artistSlice = createSlice({
    name: "artist",
    initialState: {
        artists: [],
        artistId: [],
        eventsArtist: []
    },
    reducers: {
        getAllArtists: (state, action) => {
            state.artists = action.payload;
        },
        getAllArtistById: (state, action) => {
            state.artistId = action.payload;
        },
        getArtistEvents: (state, action) => {
            state.eventsArtist = action.payload;
        },
        cleanAllDetail: (state, action) => {
            state.eventsArtist = action.payload;
        },
    }
})

export const {
    getAllArtists,
    getAllArtistById,
    getArtistEvents,
    cleanAllDetail,
} = artistSlice.actions;
export default artistSlice.reducer;
