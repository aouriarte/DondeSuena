import { useDispatch, useSelector } from "react-redux";
import { ArtistAdmin } from "./ArtistAdmin";
import { EventAdmin } from "./EventAdmin";
import { UsersAdmin } from "./UsersAdmin";
import { PlacesAdmin } from "./PlacesAdmin";
import { Navegacion } from "./Navegacion";
import { getSearch, cleanSearch } from "../../Redux/Slices/Search/searchAction";
import { useState } from "react";
import Swal from "sweetalert2";
import { Route, Routes, Navigate } from "react-router-dom";
import { Graphics } from "./Graphics/Graphics";

const DashboardAdmin = () => {
    const search = useSelector((state) => state.searchState?.search);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleSearch = (e) => {
        // limpio el input
        setValue("");

        e.preventDefault();
        if (value === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes ingresar un valor para buscar",
                confirmButtonColor: "#f8b500",
            }).then((result) => {
                if (result.isConfirmed) {
                    setValue("");
                }
            });
        } else {
            dispatch(getSearch(value));

            // si todos los valores son null, entonces no hay resultados
            if (
                search?.artists === null &&
                search?.events === null &&
                search?.places === null &&
                search?.users === null
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se encontraron resultados",
                    confirmButtonColor: "#f8b500",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setValue("");
                    }
                });
            }
            setValue("");
        }
    };

    const inputHandler = (e) => {
        setValue(e.target.value);
    };

    const user = useSelector((state) => state.sessionState?.user);
    const isAdmin = user.admin || false;

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <form
                className="flex justify-center items-center gap-2 mt-4 mb-4 mx-4 p-2 rounded-md bg-gray-100 dark:bg-slate-800 ring-slate-900/5"
                onSubmit={handleSearch}
            >
                <input
                    className="w-1/2 h-10 rounded-lg border-2 border-gray-300 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-800 focus:outline-none focus:border-indigo-500 text-base px-4"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => inputHandler(e)}
                />
                <button
                    className="w-1/4 h-10 rounded-lg border-2 border-gray-300 bg-green-500 dark:bg-slate-800 dark:text-white dark:border-slate-800 focus:outline-none focus:border-indigo-500 text-base px-4 hover:bg-green-400 dark:hover:bg-slate-700 transition duration-300 ease-in-out"
                    type="submit"
                >
                    Search
                </button>
            </form>

            {(search?.artists ||
                search?.places ||
                search?.events ||
                search?.users) && (
                <div
                    className="flex justify-center items-center gap-2 mt-4 mb-4 mx-4 p-2 rounded-md bg-gray-100 dark:bg-slate-800 ring-slate-900/5"
                    onClick={() => dispatch(cleanSearch(""))}
                >
                    <button className="w-1/4 h-10 rounded-lg border-2 border-gray-300 bg-red-500 dark:bg-slate-800 dark:text-white dark:border-slate-800 focus:outline-none focus:border-indigo-500 text-base px-4 hover:bg-red-400 dark:hover:bg-red-700 transition duration-300 ease-in-out ">
                        Clear Search
                    </button>
                </div>
            )}

            <div className="flex ">
                <div className="flex flex-col w-1/4 mr-4 ">
                    <Navegacion />
                </div>
                <div className="flex flex-col w-3/4">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                (search?.events?.length > 0 && (
                                    <EventAdmin eventSearch={search.events} />
                                )) || <EventAdmin />
                            }
                        />
                        <Route path="estadisticas" element={<Graphics />} />
                        <Route
                            path="artistas"
                            element={
                                (search?.artists?.length > 0 && (
                                    <ArtistAdmin
                                        artistSearch={search.artists}
                                    />
                                )) || <ArtistAdmin />
                            }
                        />
                        <Route
                            path="eventos"
                            element={
                                (search?.events?.length > 0 && (
                                    <EventAdmin eventSearch={search.events} />
                                )) || <EventAdmin />
                            }
                        />
                        <Route
                            path="lugares"
                            element={
                                (search?.places?.length > 0 && (
                                    <PlacesAdmin placeSearch={search.places} />
                                )) || <PlacesAdmin />
                            }
                        />

                        <Route
                            path="usuarios"
                            element={
                                (search?.users?.length > 0 && (
                                    <UsersAdmin userSearch={search.users} />
                                )) || <UsersAdmin />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
