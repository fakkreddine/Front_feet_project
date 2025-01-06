import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

// Utility function to format bytes into a more readable unit
const formatBytes = (bytes) => {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let formattedSize = bytes;

  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }

  return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};

function DataTransferStats() {
  const [upload, setUpload] = useState(0);
  const [download, setDownload] = useState(0);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
      },
    },
    colors: ['#34D399', '#F87171'], // Green for upload, Red for download
    series: [{
      name: 'Upload Data',
      data: [upload],
    }, {
      name: 'Download Data',
      data: [download],
    }],
    xaxis: {
      categories: ['Data Transfer'],
    },
    yaxis: {
      title: {
        text: 'Data Transfer (bytes)',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `${formatBytes(value)}`,
      },
    },
  });

  // Fetch the upload and download data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/db-network-stats');
        const { bytesIn, bytesOut } = response.data;  // Directly access bytesIn and bytesOut
        setUpload(bytesIn);  // Set the upload (bytesIn) value
        setDownload(bytesOut);  // Set the download (bytesOut) value
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Update chart options when upload or download changes
  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [{
        name: 'Upload Data',
        data: [upload],
      }, {
        name: 'Download Data',
        data: [download],
      }],
    }));
  }, [upload, download]);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-xl p-6 flex flex-col justify-between">
      <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Network Data Transfer Stats
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        <div className="flex flex-col items-center bg-green-100 p-4 rounded-lg">
          <h4 className="text-xl font-semibold text-gray-700">Upload</h4>
          <p className="text-2xl font-bold text-green-600">{formatBytes(upload)}</p>
        </div>
        <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg">
          <h4 className="text-xl font-semibold text-gray-700">Download</h4>
          <p className="text-2xl font-bold text-red-600">{formatBytes(download)}</p>
        </div>
      </div>

      <div className="chart-container mb-6 w-full flex-grow" style={{ height: "calc(100% - 200px)" }}>
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height="100%" // Set the chart height to 100% of the parent container
        />
      </div>
    </div>
  );
}

export default DataTransferStats;
