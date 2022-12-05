import { setTogleUserState, setTogleArtistState } from "./ProfileSlice";

export const togleUserState = (props) => (dispatch) => {
    dispatch(setTogleUserState(props));
};
export const togleAtristState = (data) => (dispatch) => {
    dispatch(setTogleArtistState(data));
};
