import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
export const EventsByPrice = ({ events }) => {
    const [userData, setUserData] = useState({
        labels: events?.map((a) => a.date),
        datasets: [
            {
                label: "Precios",
                data: events?.map((a) => a.price),
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
        setUserData({
            labels: events?.map((a) => a.date),
            datasets: [
                {
                    label: "Precios",
                    data: events?.map((a) => a.price),
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                    borderWidth: 2,
                },
            ],
        });
    }, [events]);

    return (
        <Line
            data={userData}
            options={{
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                datasets: {
                    line: {
                        tension: 0.4,
                    },
                },
            }}
            redraw={true}
            updateMode={"update"}
        />
    );
};
