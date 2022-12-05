import axios from "axios";
import { searchByDate, combineFilters } from "./filterSlice";

export const getEventByDate = (date) => (dispatch) => {
    axios(`/event/getEvents?filter[endDate]=${date}`)
        .then((res) => dispatch(searchByDate(res.data.events)))
        .catch((e) => console.log(e));
};

export const setCombinedFilters = (data) => (dispatch) => {
    console.log(data);
    dispatch(combineFilters(data));
};
