import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
    name: "purchased",
    initialState: {
        purchasedTickets: []
    },

    reducers: {
        getPurchaseRecord: (state, action) => {
            state.purchasedTickets = action.payload;
        },
    },
});

export const { getPurchaseRecord } = historySlice.actions;

export default historySlice.reducer;
