import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navegacion = () => {
    const [change, setChange] = useState(false);

    const isActived = (path) => {
        if (window.location.pathname === path) {
            return "relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white";
        } else {
            return "bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600";
        }
    };

    useEffect(() => {}, [change]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg">
                <div className="flex h-screen flex-col justify-between pt-2 pb-6">
                    <div>
                        <ul className="mt-6 space-y-2 tracking-wide">
                            <li className="min-w-max">
                                <Link
                                    to="/admin"
                                    aria-label="dashboard"
                                    className={isActived("/admin")}
                                    onClick={() => setChange(!change)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="bi bi-ticket-perforated"
                                        viewBox="0 0 16 16"
                                    >
                                        {" "}
                                        <path
                                            className="group-hover:text-cyan-600"
                                            d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"
                                        />{" "}
                                        <path
                                            className="group-hover:text-cyan-600"
                                            d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z"
                                        />{" "}
                                    </svg>
                                    <span className="-mr-1 font-medium  ">
                                        Eventos
                                    </span>
                                </Link>
                            </li>
                            <li className="min-w-max">
                                <Link
                                    to="/admin/artistas"
                                    className={isActived("/admin/artistas")}
                                    onClick={() => setChange(!change)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="bi bi-music-note-list"
                                        viewBox="0 0 16 16"
                                    >
                                        {" "}
                                        <path
                                            className="group-hover:text-cyan-600"
                                            d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"
                                        />{" "}
                                        <path
                                            fillRule="evenodd"
                                            d="M12 3v10h-1V3h1z"
                                            className="group-hover:text-cyan-600"
                                        />{" "}
                                        <path
                                            d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"
                                            className="group-hover:text-cyan-600"
                                        />{" "}
                                        <path
                                            fillRule="evenodd"
                                            className="group-hover:text-cyan-600"
                                            d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
                                        />{" "}
                                    </svg>

                                    <span className="group-hover:text-gray-700">
                                        Artistas
                                    </span>
                                </Link>
                            </li>
                            <li className="min-w-max">
                                <Link
                                    to="/admin/usuarios"
                                    className={isActived("/admin/usuarios")}
                                    onClick={() => setChange(!change)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-users"
                                    >
                                        <path
                                            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                                            className="group-hover:text-cyan-600"
                                        ></path>
                                        <circle
                                            cx="9"
                                            cy="7"
                                            r="4"
                                            className="group-hover:text-cyan-600"
                                        ></circle>
                                        <path
                                            d="M23 21v-2a4 4 0 0 0-3-3.87"
                                            className="group-hover:text-cyan-600"
                                        ></path>
                                        <path
                                            d="M16 3.13a4 4 0 0 1 0 7.75"
                                            className="group-hover:text-cyan-600"
                                        ></path>
                                    </svg>
                                    <span className="group-hover:text-gray-700">
                                        Usuarios
                                    </span>
                                </Link>
                            </li>
                            <li className="min-w-max">
                                <Link
                                    to="/admin/estadisticas"
                                    className={isActived("/admin/estadisticas")}
                                    onClick={() => setChange(!change)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            className="text-gray-600 group-hover:text-cyan-600"
                                            d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                                        />
                                        <path
                                            className="text-gray-300 group-hover:text-cyan-300"
                                            d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                                        />
                                    </svg>
                                    <span className="group-hover:text-gray-700">
                                        Estadistica
                                    </span>
                                </Link>
                            </li>
                            <li className="min-w-max">
                                <Link
                                    to="/admin/lugares"
                                    className={isActived("/admin/lugares")}
                                    onClick={() => setChange(!change)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-pin-map"
                                        viewBox="0 0 16 16"
                                    >
                                        {" "}
                                        <path
                                            className="group-hover:text-cyan-600"
                                            fillRule="evenodd"
                                            d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                                        />{" "}
                                        <path
                                            className="group-hover:text-cyan-600"
                                            fillRule="evenodd"
                                            d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                                        />{" "}
                                    </svg>
                                    <span className="group-hover:text-gray-700">
                                        Lugares
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
