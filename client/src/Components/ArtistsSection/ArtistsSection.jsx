import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getArtists } from "../../Redux/Slices/Artist/artistActions";
import { Link } from "react-router-dom";

export default function ArtistsSection() {
    const dispatch = useDispatch();
    const { artists } = useSelector((state) => state.artistState);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <div>
            <div className="relative max-w-md h-3/4 bg-white dark:bg-slate-800 ring-slate-900/5 rounded-2xl">
                <div className="overflow-auto flex flex-col divide-y h-full border rounded-2xl">
                    {artists?.map((a, i) => {
                        return (
                            <Link to={`/artistProfile/${a.id}`} key={i}>
                                <div className="flex items-center gap-4 p-4">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={a.image}
                                        alt=""
                                    />
                                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                        {a.nickname}
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
