import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    commentsId: [],
    reply: [],

    postDetail: [],
  },
  reducers: {
    getAllComments: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
    getCommentById: (state, action) => {
      state.postDetail = action.payload
    },
    addComment: (state, action) => {
      state.reply = action.payload
    },
    deleteComments: (state, action) => {
      state = action.payload
    },
    editComment: (state, action) => {
      state.comments = action.payload
    },


  },

});

export const { getAllComments, getCommentById, addComment, editComment, deleteComments } = commentsSlice.actions;
export default commentsSlice.reducer;
