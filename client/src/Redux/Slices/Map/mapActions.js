import { addressMap } from "./mapSlice";
import axios from "axios";

export const setMap = (address, api) => (dispatch) => {
    try {
        axios(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api}`
        ).then((res) => dispatch(addressMap(res.data.results[0])));
    } catch (err) {
        console.log(err);
    }
};
