import axios from "axios";

import { getCommentById, addComment, editComment, deleteComments } from "./commentsSlices";

export const getComments = (id) => (dispatch) => {
    axios.get(`/auth/artist/getComments/${id}`)
        .then((res) => {
            console.log(res.data.commentsId)
            dispatch(getCommentById(res.data.commentsId))
        })
        .catch((e) => console.log(e));
}

export const createComment = (value) => (dispatch) => {
    axios.post("/auth/user/createComment", value)
        .then((res) => {
            console.log(res.data.newComment)
            dispatch(addComment(res.data.newComment))
        })
        .catch((e) => console.log(e));
}

export const createCommentArtist = (comments) => (dispatch) => {
    axios.post("/auth/artist/createComment", comments)
        .then((res) => {
            console.log(res.data.newComment)
            dispatch(addComment(res.data.newComment))
        })
        .catch((e) => console.log(e));
}

export const deleteComment = (id) => (dispatch) => {
    axios.delete(`/auth/user/deleteComment/${id}`)
        .then((res) => {
            (deleteComments(res.data))
        })
        .catch((e) => console.log(e))
}

export const updateComment = (id) => (dispatch) => {
    axios.put(`/auth/user/editComment/${id}`)
        .then((res) => {
            dispatch(editComment(res.data.id))
        })
        .catch((e) => console.log(e))
}
