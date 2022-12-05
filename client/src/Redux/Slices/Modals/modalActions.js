import { loginModal, postVarModal } from "./modalSlice";

export const setLoginModal = () => (dispatch) => {
    dispatch(loginModal());
};
export const setPostvarModal = () => (dispatch) => {
    dispatch(postVarModal());
};
