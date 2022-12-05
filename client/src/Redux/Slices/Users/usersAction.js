import axios from "axios";

import { getUsers } from "./usersSlice";

export const getAllUsers = () => (dispatch) => {
    axios("/auth/getUsers")
        .then((res) => dispatch(getUsers(res.data.users)))
        .catch((e) => console.log(e));
};

export const deleteUser = (id) => (dispatch) => {
    axios
        .delete(`/auth/deleteUser/${id}`)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};

export const changeStateUser = (id) => (dispatch) => {
    axios
        .put(`/auth/changeStateUser/${id}`)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};
