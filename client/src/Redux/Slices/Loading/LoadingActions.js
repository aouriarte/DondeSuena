import { setLoading } from "./LoadingSlices";

export const changeLoading = () => (dispatch) => {
    dispatch(setLoading());
};
