import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getArtists } from "../../Redux/Slices/Artist/artistActions";
import { Link } from "react-router-dom";

export default function FavoritesSection() {
    const dispatch = useDispatch();
    const { artists } = useSelector((state) => state.artistState);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <div>
            <div className="relative max-w-md mx-auto bg-white dark:bg-slate-800 ring-1 ring-slate-900/5">
                <div className="top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
                    Artists
                </div>
                <div className="overflow-auto flex flex-col divide-y h-80 dark:divide-slate-200/5">
                    {artists?.map((a) => {
                        return (
                            <Link to={`/artistProfile/${a.id}`}>
                                <div className="flex items-center gap-4 p-4">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={a.image}
                                        alt=""
                                    />
                                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                        {`${a.firstName} ${a.lastName}`}{" "}
                                    </strong>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
