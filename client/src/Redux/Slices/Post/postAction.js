import axios from "axios";
import { getPost, getPostById, delPost} from "./postSlice";

export const getPostId =(id)=>(dispatch)=>{
  axios.get(`/auth/artist/getPost/${id}`)
    .then((res)=>{
      console.log(res.data)
      dispatch(getPostById(res.data.postId))})
      .catch((e) => console.log(e));
    }
export const getPosts=()=>(dispatch)=>{
  axios.get("/auth/artist/getPosts/")
    .then((res)=>dispatch(getPost(res.data.allPosts)))
    .catch((e) => console.log(e));
}

// export const getPostById =()=>(dispatch)=>{
//   axios.get("/auth/artist/getPosts")
//     .then((res)=>{
//       console.log(res.data.allPosts)
//       dispatch(getPostById(res.data.allPosts))})
//     .catch((e) => console.log(e));
// }
export const deletePost = (id) => (dispatch) => {
  axios.delete(`/auth/artist/deletePost/${id}`)
  .then((res) =>(delPost(res.data)))
  .catch((e) => console.log(e));
}
