import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        loginOpen: false,
        postVarOpen: false,
    },
    reducers: {
        loginModal: (state, action) => {
            state.loginOpen = !state.loginOpen;
        },
        postVarModal: (state, action) => {
            state.postVarOpen = !state.postVarOpen;
        },
    },
});
export const { loginModal, postVarModal } = modalSlice.actions;
export default modalSlice.reducer;
