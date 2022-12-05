import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "../../Redux/Slices/Genres/genresAction";
import { useSelector } from "react-redux";
import { setCombinedFilters } from "../../Redux/Slices/Filter/filterActions";

export default function DropdownGenreFilter() {
    const dispatch = useDispatch();
    const { genres } = useSelector((state) => state.genresState);
    const { filterCombined } = useSelector((state) => state.filterState);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const handleGenreFilter = (e) => {
        let genre = e.target.innerHTML.toString();
        dispatch(setCombinedFilters({ genre }));
    };

    return (
        <div className="group inline-block">
            <button className="outline-none focus:outline-none px-3 py-1 bg-customGray rounded-sm flex items-center min-w-32 gap-2">
                <img
                    className="h-5 w-auto group-hover:rotate-45 transition duration-300 ease-in-out"
                    src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668097753/Donde-Suena-Assets/Henry_Proyecto_Grupal_G%C3%A9nero_j8vpju.png"
                    alt="genresIcon"
                />
                <span className="font-semibold flex-1">Género</span>
                <span>
                    <svg
                        className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </span>
            </button>
            <ul
                className="grid grid-cols-3 bg-customGray border rounded-xl transform scale-0 group-hover:scale-100 absolute transition duration-300 ease-in-out origin-top min-w-32 overflow-hidden"
                onClick={(e) => handleGenreFilter(e)}
            >
                {genres.map((e, i) => (
                    <li
                        key={i}
                        className={
                            filterCombined.genre === e.name
                                ? `rounded-sm px-3 py-1 bg-gray-400 hover:cursor-pointer`
                                : `rounded-sm px-3 py-1 hover:bg-gray-400 hover:cursor-pointer`
                        }
                        value={e.name}
                    >
                        {e.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
