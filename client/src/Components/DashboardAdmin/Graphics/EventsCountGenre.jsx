import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";

export const EventsCountGenre = ({ events }) => {
    // contar la cantidad de eventos por genero
    const countGenre = (events) => {
        let count = {};
        events.forEach((event) => {
            if (count[event.genre]) {
                count[event.genre] += 1;
            } else {
                count[event.genre] = 1;
            }
        });
        return count;
    };

    const [userData, setUserData] = useState({
        labels: Object.keys(countGenre(events)),
        datasets: [
            {
                label: "Eventos",
                data: Object.values(countGenre(events)),
                fill: false,
                backgroundColor: Object.keys(countGenre(events)).map(
                    (a) =>
                        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                            Math.random() * 255
                        )}, ${Math.floor(Math.random() * 255)}, 0.2)`
                ),

                borderColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
        setUserData({
            labels: Object.keys(countGenre(events)),
            datasets: [
                {
                    label: "Eventos",
                    data: Object.values(countGenre(events)),
                    fill: false,
                    // colores aleatorios
                    backgroundColor: Object.keys(countGenre(events)).map(
                        (a) =>
                            `rgba(${Math.floor(
                                Math.random() * 255
                            )}, ${Math.floor(
                                Math.random() * 255
                            )}, ${Math.floor(Math.random() * 255)}, 0.8)`
                    ),
                    borderColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                },
            ],
        });
    }, [events]);

    return <Pie data={userData} />;
};
