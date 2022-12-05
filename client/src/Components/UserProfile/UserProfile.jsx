import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../Redux/Slices/User/userAction";
import UserEditForm from "../UserEdit/UserEdit";
import UserFavorites from "../UserFavorites/UserFavorites";
import MyShopping from "../MyShopping/MyShopping";
import {
    deleteUser,
    forgotPassword,
    logOut,
} from "../../Redux/Slices/Session/sessionActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { userId } = useSelector((state) => state.userIdState);
    const { profileUserState } = useSelector((state) => state.profileState);
    const [editInfo, setEditInfo] = useState(false);

    const tabsArray = Array.from(document.querySelectorAll("#select-tab"));
    const contentArray = Array.from(
        document.querySelectorAll("#select-content")
    );

    const handleChangeTab = (target) => {
        tabsArray.forEach((tab) => {
            tab.classList.remove("bg-customRed");
        });

        const currentTab = tabsArray.indexOf(target);

        contentArray.forEach((content) => {
            if (contentArray.indexOf(content) === currentTab) {
                content.classList.remove("hidden");
            } else if (contentArray.indexOf("content") !== currentTab) {
                content.classList.add("hidden");
            }
        });
        target.classList.add("bg-customRed");
    };

    tabsArray.forEach((tab) => {
        tab.addEventListener("click", () => {
            let target = tab;
            //itero sobre los elementos y les saco el fondo activo
            handleChangeTab(target);
        });
    });

    useEffect(() => {
        setEditInfo(false);
        dispatch(getUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (profileUserState && tabsArray[1]) {
            handleChangeTab(tabsArray[1]);
            // } else handleChangeTab(tabsArray[0]);
        } else if (!profileUserState && tabsArray[1]) {
            handleChangeTab(tabsArray[0]);
        }
    }, [tabsArray]);

    const confirmDeletion = () => {
        Swal.fire({
            title: "¿Seguro quieres eliminar tu cuenta?",
            text: "Este cambio no se podrá revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, elimínala!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(userId.id ? userId.id : userId.id));
                Swal.fire(
                    "Cuenta Eliminada!",
                    "Te vamos a extrañar :(",
                    "success"
                );
                setTimeout(navigate("/"), 3000);
            }
        });
    };

    const confirmChangePassword = () => {
        Swal.fire({
            title: "¿Seguro quieres cambiar la contraseña?",
            text: "Si confirmas se cerrará la sesión",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, quiero cambiarla!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logOut());
                dispatch(forgotPassword({ email: userId.email }));
            }
        });
    };

    const handleEdit = () => {
        setEditInfo(!editInfo);
    };
    const handleChangePassword = () => {
        confirmChangePassword();
    };
    const handleDeleteAccount = () => {
        confirmDeletion();
    };

    return (
        <div className="container min-w-full min-h-screen w-full bg-gray-400 flex flex-col p-12 gap-10 text-customGray justify-center items-center">
            <div className="flex justify-center gap-10 w-full border-b-2 pb-4">
                <p className="text-3xl uppercase font-bold">Mis Datos</p>
                <button
                    type="button"
                    onClick={handleEdit}
                    className="text-lg text-white italic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-700 ease-in-out"
                >
                    Editar Datos
                </button>
                <div className="flex gap-10">
                    <button
                        type="button"
                        onClick={handleChangePassword}
                        className="text-lg text-white italic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-500 ease-in-out"
                    >
                        Cambiar Contraseña
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="text-lg text-white italic font-semibold bg-black px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-1000 ease-in-out"
                    >
                        Borrar Cuenta
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {editInfo ? (
                    <UserEditForm />
                ) : (
                    <div className="w-5/6 p-8 bg-customGray rounded-3xl text-white flex flex-col justify-center items-center gap-8">
                        <div className="flex border-2 bg-gray-400 w-52 h-52 items-center justify-center rounded-full overflow-hidden">
                            <img
                                src={
                                    userId.image ||
                                    "https://res.cloudinary.com/ds41xxspf/image/upload/v1669140075/Donde-Suena-Assets/user_snefch.png"
                                }
                                className="object-cover h-full w-full"
                                alt=""
                            />
                        </div>
                        <h4 className="text-3xl font-bold uppercase italic border-2 rounded-3xl px-4 w-fit">
                            {userId.firstName} {userId.lastName}
                        </h4>
                        <div className="flex-col">
                            <div className="flex items-center justify-start px-8 gap-8">
                                <p className="text-2xl font-semibold w-fit">
                                    Email:
                                </p>
                                <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                                    {userId.email}
                                </p>
                            </div>
                            <div className="flex items-center justify-start px-8 gap-8">
                                <p className="text-2xl font-semibold w-fit">
                                    Dni:
                                </p>
                                <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                                    {userId.dni}
                                </p>
                            </div>
                            <div className="flex items-center justify-start px-8 gap-8">
                                <p className="text-2xl font-semibold w-fit">
                                    Birthday:
                                </p>
                                <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                                    {userId.birthday}
                                </p>
                            </div>
                            <div className="flex items-center justify-start px-8 gap-8">
                                <p className="text-2xl font-semibold w-fit">
                                    Phone:
                                </p>
                                <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                                    {userId.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className=" bg-customGray">
                <ul className="flex items-center justify-center bg-white">
                    <li
                        id="select-tab"
                        className="p-2  w-full font-bold cursor-pointer bg-customRed hover:bg-red-300"
                    >
                        Mis artistas Favoritos ⭐
                    </li>
                    <li
                        id="select-tab"
                        className="p-2  w-full font-bold cursor-pointer hover:bg-red-300"
                    >
                        Mis Compras 🛒
                    </li>
                </ul>
                <section
                    id="select-content"
                    className="container min-h-0 bg-customGray p-2 text-4xl flex items-center justify-center"
                >
                    <UserFavorites />
                </section>
                <section
                    id="select-content"
                    className="container min-h-0 bg-customGray p-3 text-4xl flex items-center justify-center"
                >
                    <MyShopping />
                </section>
            </div>
        </div>
    );
}
