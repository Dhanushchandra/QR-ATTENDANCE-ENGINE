import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Filler
);

const DBChart = () => {
  const [students, setStudents] = useState({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
  });

  const [teachers, setTeachers] = useState({
    1: 3,
    2: 4,
    3: 5,
    4: 6,
    5: 7,
    6: 8,
    7: 9,
    8: 10,
    9: 11,
    10: 12,
    11: 13,
    12: 14,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStudents({
        1: Math.floor(Math.random() * 10),
        2: Math.floor(Math.random() * 10),
        3: Math.floor(Math.random() * 10),
        4: Math.floor(Math.random() * 10),
        5: Math.floor(Math.random() * 10),
        6: Math.floor(Math.random() * 10),
        7: Math.floor(Math.random() * 10),
        8: Math.floor(Math.random() * 10),
        9: Math.floor(Math.random() * 10),
        10: Math.floor(Math.random() * 10),
        11: Math.floor(Math.random() * 10),
        12: Math.floor(Math.random() * 10),
      });
      setTeachers({
        1: Math.floor(Math.random() * 10),
        2: Math.floor(Math.random() * 10),
        3: Math.floor(Math.random() * 10),
        4: Math.floor(Math.random() * 10),
        5: Math.floor(Math.random() * 10),
        6: Math.floor(Math.random() * 10),
        7: Math.floor(Math.random() * 10),
        8: Math.floor(Math.random() * 10),
        9: Math.floor(Math.random() * 10),
        10: Math.floor(Math.random() * 10),
        11: Math.floor(Math.random() * 10),
        12: Math.floor(Math.random() * 10),
      });
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Students",

        data: Object.values(students),

        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#4caf50",
        tension: 0.1,
        lineTension: 0.2,
      },
      {
        label: "Teachers",
        data: [
          teachers[1],
          teachers[2],
          teachers[3],
          teachers[4],
          teachers[5],
          teachers[6],
          teachers[7],
          teachers[8],
          teachers[9],
          teachers[10],
          teachers[11],
          teachers[12],
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#f44336",
        lineTension: 0.2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 15,
          },
        },
      ],
    },
    responsive: true,
  };

  return <Line data={data} options={options}></Line>;
};

export default DBChart;
