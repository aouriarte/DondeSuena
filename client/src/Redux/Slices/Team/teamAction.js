import axios from "axios";
import { getAllTeam } from "./teamSlice";

export const getTeam = () => (dispatch) => {
    axios("/team/getTeam")
        .then((res) => dispatch(getAllTeam(res.data.allTeam)))
        .catch((e) => console.log(e));
};
