import axios from "axios";
import { getAllGenres } from "./genresSlice";

export const getGenres = () => (dispatch) => {
    axios("/genres/getGenres")
        .then((res) => dispatch(getAllGenres(res.data.genres)))
        .catch((e) => console.log(e));
}
