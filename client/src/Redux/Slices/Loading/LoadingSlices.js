import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = !state.loading;
        },
    },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
