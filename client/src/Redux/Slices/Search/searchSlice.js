import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        search: {},
    },
    reducers: {
        getSearchResults: (state, action) => {
            state.search = action.payload;
        },
    },
});

export const { getSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
