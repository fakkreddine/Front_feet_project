import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

function Usage() {
  const [dbStats, setDbStats] = useState({ total: 0, current: 0 });
  const [chartOptions, setChartOptions] = useState({
    series: [0, 0, 0], // Initial values set to 0, will update after fetching
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
    chart: {
      height: "250px",  // Adjust height for a more moderate chart size
      width: "100%",    // Make chart take full width of its container
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#E5E7EB',
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          margin: 0,
          size: "35%",  // Slightly larger hollow for balance
        }
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20,
      },
    },
    labels: ["Used", "Remaining", "Total"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      }
    }
  });

  const chartRef = useRef(null);

  // Fetch MongoDB stats
  useEffect(() => {
    async function fetchDbStats() {
      try {
        const response = await fetch('http://localhost:5000/db-stats');
        const data = await response.json();
        if (data && data.databaseStats) {
          const { storageSize, totalUsage } = data.databaseStats;
          setDbStats({ current: storageSize, total: totalUsage });

          // Calculate the percentages for chart
          const usedPercentage = (storageSize / totalUsage) * 100;
          const remainingPercentage = 100 - usedPercentage;

          setChartOptions((prevOptions) => ({
            ...prevOptions,
            series: [usedPercentage, remainingPercentage, 100], // Update chart series based on DB stats
          }));
        }
      } catch (error) {
        console.error('Error fetching DB stats:', error);
      }
    }

    fetchDbStats();
  }, []); // Empty dependency array ensures this runs once when component mounts

  useEffect(() => {
    if (chartRef.current && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();
      return () => chart.destroy();
    }
  }, [chartOptions]);

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 h-full">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
            MongoDB Usage: {dbStats.current} / {dbStats.total}
          </h5>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="grid grid-cols-3 gap-3 mb-2">
          <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">
              {dbStats.current}
            </dt>
            <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium">Used</dd>
          </dl>
          <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">
              {dbStats.total - dbStats.current}
            </dt>
            <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium">Remaining</dd>
          </dl>
          <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">
              {dbStats.total}
            </dt>
            <dd className="text-blue-600 dark:text-blue-300 text-sm font-medium">Total</dd>
          </dl>
        </div>
      </div>

      <div className="py-6"> {/* Adjust the height of the chart container */}
        {/* Chart Rendered here */}
        <div ref={chartRef} style={{ height: "300px" }}></div>
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          {/* Dropdown and Other Buttons */}
        </div>
      </div>
    </div>
  );
}

export default Usage;
