import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postArtist } from "../../Redux/Slices/Artist/artistActions";

import axios from "axios";

export const PostVar = () => {
    const artistId = useSelector((state) => state.artistId);
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const user = useSelector((state) => state.sessionState?.user);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Donde-Suena-Posts");
        setLoading(true);
        let url;
        if (files[0].name.includes(".mp4")) {
            url = "https://api.cloudinary.com/v1_1/ds41xxspf/video/upload";
        } else {
            url = "https://api.cloudinary.com/v1_1/ds41xxspf/image/upload";
        }
        const res = await axios.post(url, data);
        res.data.secure_url ? setSuccess(true) : setSuccess(false);
        setImage(res.data.secure_url);
        setLoading(false);
    };

    const [input, setInput] = useState({
        nickname: "",
        description: "",
        artist: "",
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const isLogged = user.isLogged;
    const imagen = user.image;
    const nickname = user.nickname;
    const isArtist = user.artista || false;
    const token = user.token || null;

    function handleSubmit(e) {
        e.preventDefault();
        const postValues = {
            ...input,
            image: image,
            artists: user.nickname,
        };
        if (postValues) {
            dispatch(postArtist(postValues));
            setSuccess(false);
            setImage("");
            setInput({
                nickname: "",
                artist: "",
                description: "",
            });
            window.location.reload();
        }
    }
    useEffect(() => {}, [dispatch]);

    return (
        // el isArtist nos permite renderizar la postBar en caso de que el usuario logueado sea artista , un usuario comun solo podria ver el home
        <div>
            {isArtist && (
                <div className="flex items-center justify-center p-5 bg-customGray rounded-xl">
                    <form
                        className="flex flex-col items-center justify-center bg-customGray w-3/4 p-5 gap-3 max-w-xl rounded-xl py-10"
                        onSubmit={handleSubmit}
                    >
                        <div className=" flex start items-start  w-full gap-3">
                            <img
                                src={imagen}
                                alt="user profile"
                                className="object-cover w-14 h-14 border-2 border-gray-300 rounded-full mb-5"
                            />

                            {/* <input
                     className="w-full text-customGray bg-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-gray-500 py-2 px-4"
                     type="text"
                     value={input.title}
                     name="title"
                     onChange={handleChange}
                     placeholder="Título"
                 /> */}
                            <textarea
                                type="textarea"
                                rows="2"
                                name="description"
                                placeholder={`Qué vas a compartir hoy ${nickname} ?`}
                                value={input.description}
                                onChange={handleChange}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 scroll-y"
                            />
                        </div>
                        <div className="w-full border-2 flex flex-col justify-center items-center rounded-xl p-4 gap-4">
                            {/* <label
                         htmlFor="image"
                         className="text-white bg-customRed rounded-xl px-6 font-bold italic"
                     >
                         Imágen o video{" "}
                     </label> */}
                            <input
                                id="image"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-customRed file:text-white hover:file:bg-gray-400 cursor-pointer mb-2"
                                type="file"
                                // accept="image/jpg, image/png, image/jpeg video/mp4,video/x-m4v,video/"
                                onChange={uploadImage}
                            />
                            {loading ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    (Subiendo Archivo)
                                </span>
                            ) : success ? (

                                <div class="w-96 h-96">
                                    {image.includes(".mp4") && (
                                        <video
                                            width="750"
                                            height="500"
                                            controls
                                        >
                                            <source
                                                src={image}
                                                type="video/mp4"
                                            />
                                        </video>
                                    )}
                                    {!image.includes(".mp4") && 

                                    <img
                                        className="w-full h-full rounded-lg object-cover"
                                        altName="Preview"
                                        src={image}
                                    />}
                                </div>
                            ) : null}
                        </div>
                        <button
                            className="px-6 py-2 border-2 border-customRed text-customRed font-bold italic leading-tight uppercase rounded-full hover:bg-black focus:outline-none focus:ring-0 transition duration-200 ease-in-out mt-5"
                            type="submit"
                        >
                            Publicar
                        </button>
                    </form>
                </div>
            )}
            {/* mapear componetnte postid la cantidad deveces que tenga el componente , por cada delemento tendria que llegar el description e imagen  */}
            {/* <PostId descripcion={"descripcion"} multimedia={null}></PostId> */}
        </div>
    );
};

export default PostVar;