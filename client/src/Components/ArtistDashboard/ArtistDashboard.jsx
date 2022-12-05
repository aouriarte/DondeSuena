import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getArtistEvent } from "../../Redux/Slices/Artist/artistActions";
import { deleteArtist, forgotPassword, logOut } from "../../Redux/Slices/Session/sessionActions";
import Swal from "sweetalert2";
import ArtistEditForm from "../ArtistEdit/ArtistEdit";


const ArtistDashboard = () => {
    const dispatch = useDispatch();
    const { eventsArtist } = useSelector((state) => state.artistState);
    const { user } = useSelector((state) => state.sessionState);
    const [editInfo, setEditInfo] = useState(false);

    const confirmDeletion = () => {
        Swal.fire({
            title: '¿Seguro quieres eliminar tu cuenta?',
            text: "Este cambio no se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínala!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteArtist(user.uid?user.uid:user.id));
                Swal.fire(
                    'Cuenta Eliminada!',
                    'Te vamos a extrañar :(',
                    'success'
                )
            }
        })
    };

    const confirmChangePassword = () => {
        Swal.fire({
            title: '¿Seguro quieres cambiar la contraseña?',
            text: "Si confirmas se cerrará la sesión",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, quiero cambiarla!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logOut());
                dispatch(forgotPassword({email: user.email}));
            }
        })
    };

    const handleEdit = () => {
        setEditInfo(!editInfo);
    };
    const handleChangePassword = () =>{
        confirmChangePassword();
    };
    const handleDeleteAccount = () => {
        confirmDeletion();
    };

    useEffect(() => {
        setEditInfo(false);
        dispatch(getArtistEvent(user.uid?user.uid:user.id));
    },[]);

    return (
        <div className="w-full min-h-screen h-full">
            <div className="min-h-screen flex flex-col my-20 mx-8 p-8 justify-start items-start bg-gray-200 rounded-3xl gap-10">
                <h1 className="text-5xl text-customRed font-bold uppercase">
                    Mis Metricas
                </h1>
                <div className="w-full bg-gray-400 rounded-3xl flex flex-col p-12 gap-4 text-customGray justify-center">
                    <div className="flex justify-start gap-10 border-b-2 pb-4">
                        <p className="text-3xl uppercase font-bold">
                            Mis Eventos
                        </p>
                        <Link to={"/create/event"}
                            className="text-lg text-white italic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-700 ease-in-out"
                        >
                            Crear Evento
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-evenly">
                    {eventsArtist.length ?
                        eventsArtist.map((event) => {
                            return (
                                <div key={event.id}
                                    className="flex rounded-3xl p-8 bg-customGray text-white items-center w-1/3 m-4"
                                >
                                    <div className="flex flex-col w-full gap-8">
                                        <h4 className="text-2xl font-bold uppercase border-2 rounded-3xl px-4 w-fit">
                                            {event.name}
                                        </h4>
                                        <div className="flex flex-col w-full gap-4">
                                            <div className="flex justify-between gap-4 flex-col">
                                                <div className="flex flex-col gap-2 w-full justify-center">
                                                    <div className="flex w-full gap-2">
                                                        <div className="flex flex-col gap-2 justify-center w-1/2">
                                                            <div className="flex justify-between items-center">
                                                                <span>Fecha:</span>
                                                                <p className="bg-gray-400 px-4 rounded-2xl text-customGray">{event.date}</p>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>
                                                                    Empieza:
                                                                </span>
                                                                <p className="bg-gray-400 px-4 rounded-2xl text-customGray">
                                                                    {event.start}
                                                                </p>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>
                                                                    Termina:
                                                                </span>
                                                                <p className="bg-gray-400 px-4 rounded-2xl text-customGray">
                                                                    {event.end}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-2 w-1/2 justify-center">
                                                            <div className="flex justify-between items-center">
                                                                <span>
                                                                    Boletos
                                                                    Disponibles:
                                                                </span>
                                                                <p className="bg-gray-400 px-4 rounded-2xl text-customGray">
                                                                    {event.quotas}
                                                                </p>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>Valor:</span>
                                                                <p className="bg-gray-400 px-4 rounded-2xl text-customGray">
                                                                    {event.price}$
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start gap-10 items-center w-full">
                                                    <span>Direccion:</span>
                                                    <p className="bg-gray-400 px-8 rounded-2xl text-customGray">
                                                        {event.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        : <div className="flex flex-col rounded-3xl p-6 bg-gray-500 text-white justify-center items-center gap-4">
                            <p className="font-bold text-xl">
                                No encontramos eventos vigentes
                            </p>
                        </div>
                    }
                    </div>
                </div>
                <h1 className="text-5xl text-customRed font-bold uppercase">
                    Mi Cuenta
                </h1>
                <div className="w-full bg-gray-400 rounded-3xl flex flex-col p-12 gap-10 text-customGray justify-center items-center">
                    <div className="flex justify-start gap-10 w-full border-b-2 pb-4">
                        <p className="text-3xl uppercase font-bold">
                            Mis Datos
                        </p>
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="text-lg text-white italic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-700 ease-in-out"
                        >
                            Editar Datos
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                    {editInfo ?
                        <ArtistEditForm/> :
                        <div className="w-5/6 p-8 bg-customGray rounded-3xl text-white flex flex-col justify-center items-center gap-8">
                            <div className="flex border-2 bg-gray-400 w-52 h-52 items-center justify-center rounded-full overflow-hidden">
                                <img src={user.image || "https://res.cloudinary.com/ds41xxspf/image/upload/v1669140075/Donde-Suena-Assets/user_snefch.png"} className="object-cover h-full w-full"/>
                            </div>
                            <h4 className="text-3xl font-bold uppercase italic border-2 rounded-3xl px-4 w-fit">
                                {user.nickname}
                            </h4>
                            <div className="flex flex-wrap w-full justify-center gap-2 border-t-2 pt-8">
                                <div className="flex items-center justify-start px-8 gap-8">
                                    <p className="text-2xl font-semibold w-fit">
                                        Email:
                                    </p>
                                    <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                                        {user.email}
                                    </p>
                                </div>
                                <div className="flex items-center justify-start px-8 gap-8">
                                    <p className="text-2xl font-semibold w-fit">
                                        Telefono:
                                    </p>
                                    <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-fit">
                                        {user.phone}
                                    </p>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex items-center justify-between px-8 gap-8">
                                        <p className="text-2xl font-semibold w-fit">
                                            Spotify:
                                        </p>
                                        {user.spotify.length > 0 ?
                                            <a className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6"
                                                href={user.spotify}
                                                target="_blank"
                                            >
                                                {user.spotify}
                                            </a>
                                            : <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6">
                                                No hay un perfil de Spotify Vinculado
                                            </p>
                                        }
                                    </div>
                                    <div className="flex items-center justify-between px-8 gap-8">
                                        <p className="text-2xl font-semibold w-fit">
                                            Instagram:
                                        </p>
                                        {user.instagram.length > 0 ?
                                            <a className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6"
                                                href={user.instagram}
                                                target="_blank"
                                            >
                                                {user.instagram}
                                            </a>
                                            : <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6">
                                                No hay un perfil de Instagram Vinculado
                                            </p>
                                        }
                                    </div>
                                    <div className="flex items-center justify-between px-8 gap-8">
                                        <p className="text-2xl font-semibold w-fit">
                                            Twitter:
                                        </p>
                                        {user.twitter.length > 0 ?
                                            <a className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6"
                                                href={user.twitter}
                                                target="_blank"
                                            >
                                                {user.twitter}
                                            </a>
                                            : <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6">
                                                No hay un perfil de Twitter Vinculado
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center justify-between px-8 gap-8 w-full overflow-y-auto">
                                    <p className="text-2xl font-semibold w-fit">
                                        Descripcion:
                                    </p>
                                    <p className="text-xl bg-gray-400 rounded-3xl text-customGray px-6 w-5/6">
                                        {user.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                    <div className="flex justify-between gap-10 w-full border-t-2 py-4">
                        <button
                            type="button"
                            onClick={handleChangePassword}
                            className="text-lg text-white italic font-semibold bg-customRed px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-500 ease-in-out">
                            Cambiar Contraseña
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="text-lg text-white italic font-semibold bg-black px-4 rounded-xl border-4 border-transparent hover:bg-white hover:text-customRed hover:border-customRed transition duration-1000 ease-in-out">
                            Borrar Cuenta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistDashboard;
