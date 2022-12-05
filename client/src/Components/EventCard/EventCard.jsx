import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Events = () => {
    const { events } = useSelector((state) => state.eventsState);
    const [visible, setVisible] = useState(4);

    const showMoreEvents = () => {
        setVisible((prevValue) => prevValue + 4);
    };

    return (
        <div className="flex flex-col items-center w-3/4 mb-20">
            <div className="w-full flex justify-around items-center flex-wrap gap-8 py-8">
                {events &&
                    events.slice(0, visible).map((el, id) => {
                        return (
                            <Link to={`/details/${el.id}`} key={id}>
                                <div className="relative sm:h-50 w-80 rounded-lg">
                                    <div>
                                        <div className="group flex  justify-center text-center relative overflow-hidden rounded-md cursor-pointer">
                                            <img
                                                className="object-cover w-80 h-60 rounded-lg  ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
                                                src={el.image}
                                                alt="imagen no encontrada"
                                            />
                                            <div className="absolute bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                                            <div className="absolute p-3 w-full h-full bottom-0 bg- rounded-lg flex flex-col justify-items-center  justify-end text-left">
                                                <div className="justify-items-center justify-end text-left">
                                                    <p className="text-2xl italic uppercase font-bold text-gray-200">
                                                        {el.name}
                                                    </p>
                                                </div>

                                                <span className="text-sm text-gray-300 dark:text-gray-300">
                                                    📅 Fecha :{el.date}
                                                </span>
                                                <span className="text-sm text-gray-300 dark:text-gray-300">
                                                    ⏰ Inicia: {el.start} -
                                                    Finaliza: {el.end}
                                                </span>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="bg-transparent hover:bg-lime-400 text-gray-300 White font-semibold hover:text-white py- px-2 border-2 border-lime-400 hover:border-transparent rounded-xl transition duration-500"
                                                    >
                                                        💵Compra por {el.price}$
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
            {visible < events.length && (
                <button
                    onClick={showMoreEvents}
                    className="bg-transparent hover:bg-customRed text-customRed font-semibold hover:text-white py-2 px-4 border border-customRed hover:border-transparent rounded-3xl my-12 transition duration-300 animate-bounce text-2xl"
                >
                    MÁS EVENTOS ↓
                </button>
            )}
        </div>
    );
};
export default Events;
