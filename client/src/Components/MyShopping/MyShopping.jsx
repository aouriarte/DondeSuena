import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketsByUser } from "../../Redux/Slices/User/userAction";
import { getEvents } from "../../Redux/Slices/Event/eventActions";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

const MyShopping = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { tickets } = useSelector((state) => state.userState);
    const { events } = useSelector((state) => state.eventsState);

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getTicketsByUser(id));
    }, [dispatch, id]);

    const ticketsData = tickets.map((ticket) => {
        let show = [];
        const evento = events.filter(
            (event) => event?.name === ticket?.events[0].name
        );

        show = [...show, { ticket, evento: evento[0] }];
        return show;
    });

    return (
        <div className="w-full flex justify-around flex-wrap overflow-y-auto bg-gradient-to-tr from-customGray to-customRed">
            {ticketsData.length ? (
                ticketsData.flat().map((el) => {
                    return (
                        <div
                            className=" transition duration-300 hover:scale-95 hover:bg-customGray-600 h-fit"
                            key={el.evento.id}
                        >
                            <div className="flex flex-col m-5 w-80 h-[35rem] items-center justify-center overflow-hidden rounded-3xl backdrop-blur-xl shadow-2xl border border-transparent hover:border-white transition duration-500 ease-in-out">
                                <Link
                                    to={`/details/${el.evento.id}`}
                                    className="w-full h-full"
                                >
                                    <div className="w-full h-1/3">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={el.evento.image}
                                            alt="event flyer"
                                        />
                                    </div>
                                    <div className="w-full h-2/3">
                                        <div className="flex flex-col justify-around w-full h-full text-left p-4">
                                            <h5 className="text-slate-100 font-bold text-5xl border-b-2 w-full pb-8">
                                                {el.evento.name}
                                            </h5>
                                            <div className="flex flex-col flex-wrap gap-3 border-b-2 pb-8">
                                                <div className="flex justify-start items-center flex-wrap text-slate-300 gap-2">
                                                    <FiCalendar
                                                        size={"1.5rem"}
                                                    />
                                                    <h3 className="text-slate-200 font-bold text-xl">
                                                        {el.ticket.date}
                                                    </h3>
                                                </div>
                                                <div className="flex justify-start items-center flex-wrap text-slate-300 gap-2">
                                                    <FaMapMarkerAlt
                                                        size={"1.5rem"}
                                                    />
                                                    <h3 className="text-slate-200 font-bold text-xl">
                                                        {el.evento.address}
                                                    </h3>
                                                </div>
                                            </div>
                                            <h5 className="text-slate-300 font-bold text-xl">
                                                Precio Total:{" "}
                                                {el.ticket.priceTotal}$
                                            </h5>
                                            <h5 className="text-slate-300 font-bold text-xl">
                                                Tickets: {el.ticket.quantity}
                                            </h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col m-5 w-1/2 h-fit p-8 items-center justify-center overflow-hidden rounded-3xl backdrop-blur-xl shadow-2xl border border-transparent hover:border-white transition duration-500 ease-in-out">
                    <p className="text-center text-white italic">
                        Tu Historial de Compras está vacío
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyShopping;
