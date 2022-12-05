import {
    getPlaces,
    deletePlaces,
    createPlaces,
    updatePlaces,
    changeStatePlace,
} from "../../Redux/Slices/Places/placesAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
export const PlacesAdmin = ({ placeSearch }) => {
    const dispatch = useDispatch();
    let { places } = useSelector((state) => state.placesState);

    const addPlaceAgain = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "El lugar volverá a estar disponible para los usuarios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, agregar",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(changeStatePlace(id));
                window.location.reload();
            }
        });
    };

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
                dispatch(deletePlaces(id));
                window.location.reload();
            }
        });
    };

    const createPlace = () => {
        Swal.fire({
            title: "Crear lugar",
            html: `
            <input id="name" className="swal2-input" placeholder="Nombre">
            <input id="address" className="swal2-input" placeholder="Dirección">
            <input id="city" className="swal2-input" placeholder="Ciudad">
            <input id="postCode" className="swal2-input" placeholder="PostCode">
            <input id="phone" className="swal2-input" placeholder="phone">
            <input id="email" className="swal2-input" placeholder="Email">
            <input id="image" className="swal2-input" placeholder="Imagen">
            `,

            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    postCode: document.getElementById("postCode").value,
                    phone: document.getElementById("phone").value,
                    email: document.getElementById("email").value,
                    image: document.getElementById("image").value,
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // si le falta algun campo  no se crea
                if (
                    !result.value.name ||
                    !result.value.address ||
                    !result.value.city ||
                    !result.value.postCode ||
                    !result.value.phone ||
                    !result.value.email ||
                    !result.value.image
                ) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Faltan campos",
                    });
                    return;
                }

                dispatch(createPlaces(result.value));
                window.location.reload();
            }
        });
    };

    const updatePlace = (place) => {
        Swal.fire({
            title: "Actualizar lugar",
            html: `
            <input id="name" className="swal2-input" placeholder="Nombre" value="${place.name}">
            <input id="address" className="swal2-input" placeholder="Dirección" value="${place.address}">
            <input id="city" className="swal2-input" placeholder="Ciudad" value="${place.city}">
            <input id="postCode" className="swal2-input" placeholder="PostCode" value="${place.postCode}">
            <input id="phone" className="swal2-input" placeholder="phone" value="${place.phone}">
            <input id="email" className="swal2-input" placeholder="Email" value="${place.email}">
            <input id="image" className="swal2-input" placeholder="Imagen" value="${place.image}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    postCode: document.getElementById("postCode").value,
                    phone: document.getElementById("phone").value,
                    email: document.getElementById("email").value,
                    image: document.getElementById("image").value,
                };
            },
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // si el usuario no cambia nada, no se actualiza
                    if (
                        result.value.name === place.name &&
                        result.value.address === place.address &&
                        result.value.city === place.city &&
                        result.value.postCode === place.postCode &&
                        result.value.phone === place.phone &&
                        result.value.email === place.email &&
                        result.value.image === place.image
                    ) {
                        return;
                    }

                    dispatch(updatePlaces(place.id, result.value));
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        dispatch(getPlaces());
    }, [dispatch]);

    if (placeSearch) {
        places = [...placeSearch];
    }
    return (
        <div>
            <div className="relative  h-3/4 bg-white dark:bg-slate-800 ring-slate-900/5 rounded-2xl">
                <div className="overflow-auto flex flex-col divide-y h-full border rounded-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Lugares
                        </h1>
                    </div>
                    <div
                        className="flex items-center gap-4 p-4 cursor-pointer bg-green-500 rounded-md text-white font-bold hover:bg-green-600 transition duration-300"
                        onClick={() => {
                            createPlace();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white dark:text-white"
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
                    {places?.map((a, i) => {
                        return (
                            <div className="flex items-center gap-4" key={i}>
                                <img
                                    className="w-12 h-12 rounded-full object-cover"
                                    src={a.image || "https://picsum.photos/200"}
                                    alt="Not found"
                                />

                                <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                    {a.name}
                                </strong>
                                <div className="flex items-center gap-4">
                                    <strong className="text-slate-500 text-sm font-medium dark:text-slate-200">
                                        {a.address}
                                    </strong>
                                    <strong className="text-slate-500 text-sm font-medium dark:text-slate-200">
                                        {a.city}
                                    </strong>
                                    <strong className="text-slate-500 text-sm font-medium dark:text-slate-200">
                                        {a.postCode}
                                    </strong>
                                </div>
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
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <div
                                    onClick={() => updatePlace(a)}
                                    className="flex items-center gap-4 p-4 cursor-pointer bg-yellow-500 rounded-md text-white font-bold hover:bg-yellow-600 transition duration-300"
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
                                            d="M3,18 L14.9997108,6 L18,9 L6,21 L3,21 L3,18 Z M16,5 L17.9997108,3 L21,6 L18.9989741,8.00102587 L16,5 Z"
                                        />
                                    </svg>
                                </div>
                                {a.state === false && (
                                    <div
                                        onClick={() => addPlaceAgain(a.id)}
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
