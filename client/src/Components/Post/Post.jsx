import React from "react";

export const Post = ({ name, description, message }) => {
    return (
        <div className="post bg-slate-400 p-15 mb-10 rounded-lg">
            <div className="post_header flex-initial mb-10 ">
                <h2>Foto de perfil</h2>
                <div className="post_info ml-10px"></div>
                <h2 className="text-xs">{name}</h2>
                <p className="text-xs text-white ">{description}</p>
            </div>
            <div className="post_body break-words">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Post;
