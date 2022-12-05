import {
    deleteUser,
    getAllUsers,
    changeStateUser,
} from "../../Redux/Slices/Users/usersAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const UsersAdmin = ({ userSearch }) => {
    const dispatch = useDispatch();
    let { users } = useSelector((state) => state.usersState);

    const trashEmpty = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
                window.location.reload();
            }
        });
    };

    const addArtistUsers = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "El Artista volverá a estar disponible para los usuarios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, agregar",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(changeStateUser(id));
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    if (userSearch) {
        users = [...userSearch];
    }

    return (
        <div>
            <div className="relative max-w-md h-3/4 bg-white dark:bg-slate-800 ring-slate-900/5 rounded-2xl">
                <div className="overflow-auto flex flex-col divide-y h-full border rounded-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Usuarios
                        </h1>
                    </div>

                    {users?.map((a, i) => {
                        return (
                            <div
                                className="flex items-center gap-4 p-4 flex-"
                                key={i}
                            >
                                <img
                                    className="w-12 h-12 rounded-full object-cover"
                                    src={a.image}
                                    alt=""
                                />
                                <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                    {a.firstName} {a.lastName}
                                </strong>
                                <div
                                    className="flex items-center gap-4 p-4 cursor-pointer bg-red-500 rounded-md text-white font-bold hover:bg-red-600 transition duration-300"
                                    onClick={() => trashEmpty(a.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z"
                                        />
                                    </svg>
                                </div>
                                {a.state === false && (
                                    <div
                                        onClick={() => addArtistUsers(a.id)}
                                        className="flex items-center gap-4 p-4 cursor-pointer bg-blue-500 rounded-md text-white font-bold hover:bg-blue-600 transition duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};
