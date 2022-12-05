import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments } from "../../Redux/Slices/Comments/commentsAction";
import { Comments } from "../CommentsUser/Comments";
import { DateTime } from "../DateTime/DateTime";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const PostDetail = () => {
    const dispatch = useDispatch();
    const { postDetail } = useSelector((state) => state?.postDetail);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id]);

  

    return (
        <div class="wrapper pt-10 px-8 flex flex-col items-center">
            <div class="mb-3 break-inside p-6 rounded-xl bg-white dark:bg-customGray flex flex-col bg-clip-border sm:w-3/6 w-full">
                <div class="flex pb-6 items-center justify-between">
                    <div class="flex">
                        <a class="inline-block mr-4" href="#">
                            <img
                                class="rounded-full max-w-none w-12 h-12 items-center "
                                src={postDetail.artists[0].image}
                                alt=""
                            />
                        </a>
                        <div class="flex flex-col">
                            <div>
                                <a
                                    class="inline-block text-lg font-bold dark:text-white "
                                    href="#"
                                >
                                    {postDetail.artists[0].nickname}
                                </a>
                            </div>
                            <div class="text-slate-500 dark:text-slate-300 dark:text-slate-400">
                                <DateTime />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-1"></div>
                <p class="dark:text-slate-200">{postDetail.description}</p>
                <div class="py-4 items-center ml-15">
                    <div class="  max-w-smv ml-10 ">
                        <div class="content-center  m-auto max-w-sm ml-29  gap-4 object-contain ">
                            {/* <img
                                                        className="content-center  m-auto max-w-sm ml-29  gap-4 object-contain ml-20"
                                                        src={
                                                            el.image
                                                                ? el.image
                                                                : null
                                                        }
                                                        alt=""
                                                    /> */}
                            {postDetail.image.includes(".mp4") && (
                                <video width="750" height="500" controls>
                                    <source
                                        src={postDetail.image}
                                        type="video/mp4"
                                    />
                                </video>
                            )}
                            {!postDetail.image.includes(".mp4") && (
                                <img
                                    class="w-full bg-cover"
                                    alt={""}
                                    src={postDetail.image}
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

                {/* <input
                    class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-white rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-400 font-medium pr-20"
                    type="text"
                    placeholder="Escribe tu comentario"
                    disabled
                /> */}
            </div>
            <div className=" w-96 p-3 mr-10  relative ">
                <div className="w-11/12 ">
                    <Comments idposts={postDetail.id} className="w-3.5" />
                </div>
            </div>

            {postDetail.comments?.map((el) => (
                <section class=" items-center justify-center w-3/5 ">
                    <div key={el.id} class="container w-full ">
                        <div
                            class="w-full bg-customGray
                         border-b-2 border-r-2  sm:py-4  rounded-2xl p-8"
                        >
                            <div className=" dark:text-slate-200 items-end">
                                <DateTime />
                            </div>

                            <div class="flex flex-row ml-10">
                                <img
                                    class="object-cover w-12 h-12 border-2 ml-10 border-gray-300 rounded-full"
                                    alt="avatar"
                                    src={el.users[0]?.image}
                                />
                                <div class="flex-col mt-1 ml-10">
                                    <div class=" dark:text-slate-200 flex items-center flex-1 px-4 font-bold leading-tight">
                                        {el.users[0]?.firstName}
                                    </div>
                                    <div class=" dark:text-slate-200 flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                        {el.body}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
            <div className="m-8">
                <Link
                    to="/postHome"
                    class="relative px-6 py-3 font-bold text-black group"
                >
                    <span class="absolute  inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-customRed group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
                    <span class="relative"> 👈 Regresar </span>
                </Link>
            </div>
        </div>
    );
};
export default PostDetail;
