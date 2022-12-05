import React, { useEffect, useState } from "react";
import { Post } from "../Post/Post";

export const ArtistFeed = () => {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");
    useEffect(() => {});

    const sendPost = (e) => {
        e.preventDefault();
        setInput("");
    };

    return (
        <div className="postbar">
            <div className="reply">
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                    />
                    <button onClick={sendPost} type="submit">
                        Enviar
                    </button>
                </form>
            </div>
            {/* // donde van los post */}
            {/* LO QUE HAGO CON EL MAP ES RENDERIZAR CADA POST CADA VEZ QUE SE CREA */}
            {posts.map(
                ({ id, data: { name, description, message, photoUrl } }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                )
            )}
        </div>
    );
};

export default ArtistFeed;
