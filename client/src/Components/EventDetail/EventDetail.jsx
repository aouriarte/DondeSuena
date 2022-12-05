import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getEventsById, updateTickets, getQuantityTickets } from "../../Redux/Slices/Event/eventActions";
import { useNavigate } from "react-router-dom";
import useGoogleAddress from "../../hooks/useGoogleAddress";
import Map from "../Map/Map";
import { ticketPurchase, clearUrl, createTicketMP, sendInvoice } from "../../Redux/Slices/User/userAction";
import { setLoginModal } from "../../Redux/Slices/Modals/modalActions";
import Loading from "../Loading/Loading";
import { changeLoading } from "../../Redux/Slices/Loading/LoadingActions";
import Swal from "sweetalert2";
import { FaMapMarkerAlt } from "react-icons/fa";

const successPurchase = () => {
    Swal.fire({
        title: "Compra exitosa!",
        text: "Encontrarás tu boleto en tu Historial de compras!",
        icon: "success",
        timer: 2000,
    });
};

const failedPurchase = () => {
    Swal.fire({
        title: "Ocurrió un error en el Pago",
        text: "Inténtalo nuevamente más tarde!",
        icon: "error",
        timer: 2000,
    });
};

const noTickets = () => {
    Swal.fire({
        title: "Llegaste tarde :(",
        text: "No hay más tickets para el show deseado",
        icon: "error",
        timer: 2000,
    });
};

const noTicketsDesired = () => {
    Swal.fire({
        title: "Ocurrió un error",
        text: "No hay la cantidad de tickets suficientes para tu orden",
        icon: "error",
        timer: 2000,
    });
};

const EventDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({});
    const { detail } = useSelector((state) => state.detailState);
    const [quantity, setQuantity] = useState(1);
    const { paymentUrl } = useSelector((state) => state.userPublicState);
    const [order, setOrder] = useState(false);
    const { loading } = useSelector((state) => state.loadingState);
    const { ticketsAvailable } = useSelector((state) => state.eventsState);
    let location = useGoogleAddress(`${detail.address}, ${detail.city}`);
    const navigate = useNavigate();
    const user = useSelector((state) => state.sessionState?.user);
    const isLogged = user.isLogged;

    let payment_id = query.payment_id;
    let purchasedQuantity = query.purchasedQuantity;

    const modal = () => {
        dispatch(setLoginModal());
    };

    const artistCantPurchase = () => {
        Swal.fire({
            title: "No puedes comprar tickets",
            text: 'Debes iniciar sesión como "Público"',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Iniciar sesión como "Público"',
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                modal();
            }
        });
    };

    useEffect(() => {
        dispatch(getEventsById(id));
    }, [dispatch, id]);

    const loadingCallback = useCallback(() => {
        dispatch(changeLoading());
        setTimeout(() => {
            dispatch(changeLoading());
        }, 1000);
    }, [dispatch]);

    useEffect(() => {
        loadingCallback();
    }, [loadingCallback]);

    const handlePurchase = () => {
        setOrder(false);
        dispatch(clearUrl());
        if (!user.artista) {
            if (ticketsAvailable === 0) {
                noTickets();
            } else {
                if (ticketsAvailable < quantity) {
                    noTicketsDesired();
                } else {
                    setOrder(true);
                    let detailsPurchase = {
                        quantity: parseInt(quantity),
                        priceTotal: detail.price,
                        id: id,
                    };
                    dispatch(ticketPurchase(detailsPurchase));
                }
            }
        } else artistCantPurchase();
    };

    const handleQuantity = (e) => {
        e.preventDefault();
        setQuantity(e.target.value);
    };

    useEffect(() => {
        window.scrollTo(0, 100);
        dispatch(clearUrl());
        dispatch(getQuantityTickets(id));
        setQuery(Object.fromEntries([...searchParams]));
        setOrder(false);
    }, [dispatch, id, searchParams]);

    useEffect(() => {
        dispatch(getQuantityTickets(id));
        if (query.hasOwnProperty("payment_id") && query.payment_id === "null") {
            failedPurchase();
            window.history.pushState(null, "Details", `/details/${id}`);
        } else if (
            query.hasOwnProperty("payment_id") &&
            query.payment_id !== "null"
        ) {
            dispatch(
                updateTickets({
                    quantity: parseInt(query.purchasedQuantity),
                    id: id,
                })
            );

            dispatch(getQuantityTickets(id));
            dispatch(
                sendInvoice({
                    name: user.firstName,
                    email: user.email,
                    quantity: parseInt(query.purchasedQuantity),
                    id: id,
                })
            );

            dispatch(
                createTicketMP(payment_id, purchasedQuantity, {
                    priceTotal: detail.price,
                    date: detail.date,
                    event: detail.name,
                    user: user.firstName,
                })
            );

            successPurchase();

            window.history.pushState(null, "Details", `/details/${id}`);
        }

        return () => {
            location = "";
        };
    }, [dispatch, query, user.firstName]);

    return (
        <div>
            {
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    {loading && <Loading />}
                    <div
                        className={
                            !loading ? "flex mx-10 my-16 gap-8" : "hidden"
                        }
                    >
                        <div className="w-1/2 flex flex-col">
                            <div className="relative rounded-lg overflow-hidden mb-10">
                                <img
                                    alt="event"
                                    className="object-cover rounded-lg border-gray-200 w-full"
                                    src={detail.image}
                                />
                                <div className="absolute bottom-0 px-10 py-10 bg-gray-800 w-full max-h-1/8 opacity-80 rounded-lg">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-white text-5xl font-bold">
                                            {detail.name}
                                        </p>
                                        <p className="text-medium text-white tracking-widest">
                                            {detail.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-end mt-3 mb-3">
                                <FaMapMarkerAlt />
                                <span className="font-bold mx-2">{`${detail.address}, ${detail.city}`}</span>
                            </div>
                            <Map data={location}></Map>
                        </div>
                        <div className="w-1/2 bg-gray-300 rounded-lg p-8 flex flex-col gap-4">
                            <h1 className="font-bold uppercase text-3xl text-center my-5">
                                {detail.name}
                            </h1>
                            <div className="leading-relaxed h-fit w-full overflow-hidden">
                                {detail.description}
                            </div>
                            <p className="leading-relaxed">
                                <span className="font-bold mr-2">
                                    ⏰ Hora de Inicio:
                                </span>
                                {detail.start}
                            </p>
                            <p className="leading-relaxed">
                                <span className="font-bold mr-2">
                                    ⏰ Hora de Finalización:
                                </span>
                                {detail.end}
                            </p>
                            <p className="leading-relaxed">
                                <span className="font-bold mr-2">
                                    💵 Valor de entrada:
                                </span>
                                {detail.price}$
                            </p>
                            <p className="leading-relaxed">
                                <span className="font-bold mr-2">
                                    🎫 Entradas disponibles:
                                </span>
                                {ticketsAvailable}
                            </p>

                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div className="flex ml-6 items-center">
                                    <div className="relative"></div>
                                </div>
                            </div>

                            <div className="flex space-x-4 items-center... max-h-12">
                                <div className="relative flex justify-center items-center">
                                    <select
                                        className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                                        name={"quantity"}
                                        value={quantity}
                                        onChange={handleQuantity}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-5 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                                {
                                    <button
                                        {...(isLogged
                                            ? {
                                                  onClick: handlePurchase,
                                                  className:
                                                      "flex text-white bg-customRed border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg",
                                              }
                                            : {
                                                  onClick: () => {
                                                      modal();
                                                  },
                                                  className:
                                                      "flex text-white bg-customRed border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg",
                                              })}
                                    >
                                        <p className="font-bold uppercase">
                                            Comprar
                                        </p>
                                    </button>
                                }
                                <div>
                                    {order ? (
                                        paymentUrl.length > 0 ? (
                                            <a
                                                href={paymentUrl}
                                                className="flex ml-auto text-white bg-sky-300 border-0 px-4 focus:outline-none hover:bg-sky-400 rounded max-h-12"
                                            >
                                                <div className="flex justify-center items-center w-24 max-h-12">
                                                    <img
                                                        src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668792016/Donde-Suena-Assets/mercado-pago_pxshfi.png"
                                                        className="h-30 object-cover"
                                                        alt=""
                                                    />
                                                </div>
                                            </a>
                                        ) : (
                                            <div className="flex items-center">
                                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                                    (Generando la orden...)
                                                </span>
                                            </div>
                                        )
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid h-15px place-items-center ">
                                <ul className="flex flex-wrap">
                                    <li className="pr-4 ... pt-40 ... px-8 ...">
                                        <img
                                            src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668128720/Donde-Suena-Assets/thumbnail_instagram_uhwi1o.png"
                                            alt="instagram logo"
                                            height="50px"
                                            width="50px"
                                        />
                                    </li>
                                    <li className="pr-4 ... pt-40 ... px-8 ...">
                                        <img
                                            src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668128720/Donde-Suena-Assets/thumbnail_twitter_jnclek.png"
                                            alt="twitter logo"
                                            height="50px"
                                            width="50px"
                                        />
                                    </li>
                                    <li className="pr-4 ... pt-40 ... px-8 ...">
                                        <img
                                            src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668128720/Donde-Suena-Assets/thumbnail_facebook_glqqwf.png"
                                            alt="facebook logo"
                                            height="50px"
                                            width="50px"
                                        />
                                    </li>
                                </ul>
                                <ul className="flex flex-wrap items-center mt-3 text-sm text-white-500 dark:text-gray-400 sm:mt-0"></ul>
                            </div>
                            <div className="flex mx-20 mt-20 mr-20 justify-center">
                                <button
                                    onClick={() => navigate("/")}
                                    className=" text-white bg-customRed border-0 py-3 px-6 focus:outline-none hover:bg-red-500 rounded uppercase font-bold"
                                >
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    );
};
export default EventDetail;
