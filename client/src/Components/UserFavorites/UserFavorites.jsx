import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFavorites,
    deleteFavorite,
} from "../../Redux/Slices/Favorites/favoritesAction";
import { getArtists } from "../../Redux/Slices/Artist/artistActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserFavorites = () => {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favoritesState);

    const callback = useCallback(() => {
        dispatch(getFavorites());
    }, [dispatch, favorites]);

    useMemo(() => {
        callback();
    }, [callback]);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const handleDeleteFavorite = (e) => {
        dispatch(deleteFavorite(e));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Favorito Eliminado 😥",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="w-full grid grid-cols-3 overflow-y-auto bg-gradient-to-tl from-customGray to-customRed">
            {favorites.length ? (
                favorites.map((artist) => {
                    return (
                        <div
                            className="transition duration-300 hover:scale-95 hover:bg-customGray-600 h-fit"
                            key={artist.id}
                        >
                            <div className="flex flex-col m-5 w-80 h-64 items-center justify-center overflow-hidden rounded-3xl backdrop-blur-xl shadow-2xl border border-transparent hover:border-white transition duration-500 ease-in-out">
                                <button
                                    className="p-2 text-center text-white transition bg-customRed rounded-full hover:bg-red-400 focus:outline-none absolute top-5 right-5 cursor-pointer"
                                    onClick={() =>
                                        handleDeleteFavorite(artist.id)
                                    }
                                    value={artist.id}
                                >
                                    <svg
                                        className="w-6 h-6 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <Link
                                    to={`/artistProfile/${artist.id}`}
                                    key={artist.id}
                                    className="flex flex-col justify-evenly items-center w-full h-full gap-4 cursor-pointer"
                                >
                                    <div className="flex justify-center h-32 w-32 rounded-full items-center">
                                        <img
                                            className="h-full w-full rounded-full object-cover"
                                            src={artist.image}
                                        />
                                    </div>
                                    <div className="text-center text-1xl text-white font-bold border-t w-full pt-4">
                                        {artist.nickname}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col m-5 w-1/2 h-fit p-8 items-center justify-center overflow-hidden rounded-3xl backdrop-blur-xl shadow-2xl border border-transparent hover:border-white transition duration-500 ease-in-out">
                    <p className="text-center text-white italic">
                        No tienes Artistas Favoritos
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserFavorites;
