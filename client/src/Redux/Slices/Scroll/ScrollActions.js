import { setScrollState } from "./ScrollSlice";

export const setScroll = (data) => (dispatch) => {
    dispatch(setScrollState(data));
};
