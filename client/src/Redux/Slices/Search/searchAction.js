import axios from "axios";

import { getSearchResults } from "./searchSlice";

export const getSearch = (search) => (dispatch) => {
    axios(`get/search/${search}`)
        .then((res) => {
            dispatch(getSearchResults(res.data.results));
        })
        .catch((e) => console.log(e));
};

export const cleanSearch = () => (dispatch) => {
    dispatch(getSearchResults({}));
};
