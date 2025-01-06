import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';

function Pie() {
  const sessionId = useSelector((state) => state.session.value);
  const [chartOptions, setChartOptions] = useState({
    series: [0, 0], // Initially, setting the series to zero
    colors: ["#1C64F2", "#16BDCA"],
    chart: {
      height: "100%", // Make chart height take 100% of the parent container
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25
        }
      },
    },
    labels: ["Lectures", "Labs"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Inter, sans-serif",
      markers: {
        width: 12,
        height: 12,
        radius: 10,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  });

  const [loading, setLoading] = useState(true);

  // Fetch the data from APIs
  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      // Fetch subject-lab-count and subject-lecture-count
      const labResponse = await axios.get(`http://localhost:8081/admin/sessions/${sessionId}/subject-lab-count`);
      const lectureResponse = await axios.get(`http://localhost:8081/admin/sessions/${sessionId}/subject-lecture-count`);

      // Calculate the total count
      const total = lectureResponse.data + labResponse.data;

      // Calculate percentages for each segment
      const lecturePercentage = (lectureResponse.data / total) * 100;
      const labPercentage = (labResponse.data / total) * 100;

      // Update the state with the new data (percentages)
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [lecturePercentage, labPercentage], // Update the series with percentages
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty array ensures the effect runs once on mount

  return (
    <div className=" w-1/3 h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center mb-1">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Subject Lectures vs Labs</h5>
        </div>
        <button
          onClick={fetchData}
          className="ml-3  hover:text-gray-900 focus:outline-none text-blue-600"
        >
          <ReloadOutlined />
        </button>
      </div>

      {/* Conditionally render loading spinner or chart */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12zm8-6a6 6 0 1 1 0 12A6 6 0 0 1 12 6z"></path>
          </svg>
        </div>
      ) : (
        <div className="py-6" id="pie-chart" style={{ height: "calc(100% - 70px)" }}> {/* Adjust height based on other content */}
          <ReactApexChart options={chartOptions} series={chartOptions.series} type="pie" height="100%" />
        </div>
      )}

      {/* Legend below the chart */}
     
    </div>
  );
}

export default Pie;
