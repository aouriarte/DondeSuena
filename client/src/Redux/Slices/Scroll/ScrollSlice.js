import { createSlice } from "@reduxjs/toolkit";

export const scrollSlice = createSlice({
    name: "scroll",
    initialState: {
        scroll: [0, 0],
    },
    reducers: {
        setScrollState: (state, action) => {
            state.scroll = action.payload;
        },
    },
});
export const { setScrollState } = scrollSlice.actions;
export default scrollSlice.reducer;
