import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userPublic",
    initialState: {
        modal: false,
        tickets: [],
        paymentUrl: "",
        userId: [],
    },
    reducers: {
        paymentOrder: (state, action) => {
            state.paymentUrl = action.payload;
        },
        getAllTicketsByUser: (state, action) => {
            state.tickets = action.payload;
        },

        clearPaymentOrder: (state) => {
            state.paymentUrl = "";
        },
        getDataUserId: (state, action) => {
            state.userId = action.payload;
        },
        createAllTicketMP: (state, action) => {
            state.tickets = [...state.tickets, action.payload];
        },
    },
});
export const {
    getAllTicketsByUser,
    paymentOrder,
    clearPaymentOrder,
    getDataUserId,
    createAllTicket,
} = userSlice.actions;

export default userSlice.reducer;
