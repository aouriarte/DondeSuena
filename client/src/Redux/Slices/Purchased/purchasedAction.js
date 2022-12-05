import axios from "axios";
import { getPurchaseRecord } from "./purchasedSlice";

export const getPurchasedTickets = () => (dispatch) => {
    axios("")
        .then((res) => dispatch(getPurchaseRecord(res.data.purchasedTickets)))
        .catch((e) => console.log(e));
}
