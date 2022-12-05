import React from "react";
import { PostVar } from "../PostVar/PostVar";
import { PostCard } from "../PostCard/PostCard";
import { Comments } from "../CommentsUser/Comments";


import "../CommentsUser/comments.css";

const PostHome = (el) => {
    return (
        <div>
            <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-10">
                <PostVar />
            </div>
            <div>
                {/* <PostCard /> */}
                <PostCard/>
            </div>
            <div>
                {/* esta hardcodeado el id del usuario  , tendria que ser el current id */}
                {/* <Comments currentUserId="1"/> */}
            </div>
        </div>
    );
};

export default PostHome;
