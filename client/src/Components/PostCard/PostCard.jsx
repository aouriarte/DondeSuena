import { getPosts } from "../../Redux/Slices/Post/postAction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getArtists } from "../../Redux/Slices/Artist/artistActions";
import { Comments } from "../CommentsUser/Comments";
import { DateTime } from "../DateTime/DateTime";
import { Link } from "react-router-dom";

export const PostCard = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const [visible, setVisible] = useState();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <div>
            {posts &&
                posts?.map((el, id) => {
                    return (
                        <div class="wrapper pt-10 px-8 flex flex-col items-center">
                            <div class="mb-3 break-inside p-6 rounded-xl bg-white dark:bg-customGray flex flex-col bg-clip-border sm:w-3/6 w-full">
                                <div class="flex pb-6 items-center justify-between">
                                    <div class="flex">
                                        <a class="inline-block mr-4" href="#">
                                            <img
                                                class="rounded-full max-w-none w-12 h-12 items-center "
                                                src={el.artists[0].image}
                                                alt=""
                                            />
                                        </a>
                                        <div class="flex flex-col">
                                            <div>
                                                <a
                                                    class="inline-block text-lg font-bold dark:text-white "
                                                    href="#"
                                                >
                                                    {el.artists[0].nickname}
                                                </a>
                                            </div>
                                            <div class="text-slate-500 dark:text-slate-300 dark:text-slate-400">
                                                <DateTime />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="py-1"></div>
                                <p class="dark:text-slate-200">
                                    {el.description}
                                </p>
                                <div class="py-4 items-center ml-15">
                                    <div class="  max-w-smv ml-10 ">
                                        <div class="content-center  m-auto max-w-sm ml-29  gap-4 object-contain ">
                                            {el.image.includes(".mp4") && (
                                                <video
                                                    width="750"
                                                    height="500"
                                                    controls
                                                >
                                                    <source
                                                        src={el.image}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            )}
                                            {!el.image.includes(".mp4") && (
                                                <img
                                                    class="w-full bg-cover"
                                                    alt={""}
                                                    src={el.image}
                                                />
                                            )}
                                        </div>
                                        <div className="space-x-4 ">
                                            <a
                                                class="inline-flex items-center py-2 mr-3"
                                                href="#"
                                            >
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/1171/1171164.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt=""
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/1682/1682643.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/5448/5448458.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/2131/2131882.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/1776/1776547.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/6889/6889260.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/1026/1026024.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/2095/2095182.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/2881/2881861.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/2983/2983951.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/5659/5659128.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                                <img
                                                    className="space-x-4"
                                                    src="https://cdn-icons-png.flaticon.com/512/6043/6043734.png"
                                                    width="40px"
                                                    height="40px"
                                                    alt="icono"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="relative">
                                    <Link to={`/postHome/${el.id}`}>
                                        <input
                                            class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-white rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-400 font-medium pr-20"
                                            type="text"
                                            placeholder="Escribe tu comentario"
                                            disabled
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default PostCard;
