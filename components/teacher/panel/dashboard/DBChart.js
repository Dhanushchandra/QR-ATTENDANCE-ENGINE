import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

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
  const [attendanceData, setAttendanceData] = useState([]);

  const classes = useSelector((state) => state.teacherClasses.classes);

  useEffect(() => {
    const attendanceArr = [];
    for (let i = 0; i < classes.length; i++) {
      attendanceArr.push(classes[i].recentAttendance);
    }
    setAttendanceData(attendanceArr);
  }, [classes]);

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const classLabels = classes.map((item) => item.name);

  const numClasses = attendanceData.length;
  const borderColors = Array.from(
    { length: numClasses },
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`
  );

  const data = {
    labels: attendanceData[0]?.map((item) => dateHandler(item.date)) || [],
    datasets: attendanceData.map((attendance, index) => {
      return {
        label: classLabels[index],
        data: attendance.map((item) => item.students.length),
        fill: true,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
        borderColor: borderColors[index % numClasses],
        lineTension: 0.2,
      };
    }),
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
    responsive: true,
  };

  return <Line data={data} options={options}></Line>;
};

export default DBChart;
