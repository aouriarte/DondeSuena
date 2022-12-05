import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
    name: "modal",
    initialState: {
        map: {},
    },
    reducers: {
        addressMap: (state, action) => {
            state.map = action.payload;
        },
    },
});
export const { addressMap } = mapSlice.actions;
export default mapSlice.reducer;
