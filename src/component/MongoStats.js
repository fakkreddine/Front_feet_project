import React, { useEffect, useState } from 'react';
import { FaDatabase, FaCogs, FaRegFileAlt, FaHdd, FaFile, FaListUl, FaCog, FaListOl } from 'react-icons/fa';
import axios from 'axios';

// StatsCard component to display individual stat cards
const StatsCard = ({ title, value, icon, iconColor }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-md">
      <div className={`mb-4 ${iconColor}`}>
        {icon}
      </div>
      <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-500">{value}</p>
    </div>
  );
};

// DatabaseStats component to fetch and display database stats
const DatabaseStats = () => {
  const [dbStats, setDbStats] = useState(null);

  useEffect(() => {
    const fetchDbStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/db-stats');
        setDbStats(response.data.databaseStats);
      } catch (error) {
        console.error("Error fetching MongoDB stats", error);
      }
    };

    fetchDbStats();
  }, []);

  return (
    <div className="p-4">
      {dbStats ? (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* First row of stats */}
            <StatsCard 
              title="Database Name" 
              value={dbStats.databaseName} 
              icon={<FaDatabase className="w-8 h-8" />} 
              iconColor="text-blue-500"
            />
            <StatsCard 
              title="Avg Object Size" 
              value={`${dbStats.avgObjSize.toFixed(2)} bytes`} 
              icon={<FaCogs className="w-8 h-8" />} 
              iconColor="text-green-500"
            />
            <StatsCard 
              title="Collections" 
              value={dbStats.collections} 
              icon={<FaRegFileAlt className="w-8 h-8" />} 
              iconColor="text-purple-500"
            />
            <StatsCard 
              title="Storage Size" 
              value={`${dbStats.storageSize} bytes`} 
              icon={<FaHdd className="w-8 h-8" />} 
              iconColor="text-yellow-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* Second row of stats */}
            <StatsCard 
              title="Data Size" 
              value={`${dbStats.dataSize} bytes`} 
              icon={<FaFile className="w-8 h-8" />} 
              iconColor="text-teal-500"
            />
            <StatsCard 
              title="Index Size" 
              value={`${dbStats.indexSize} bytes`} 
              icon={<FaListUl className="w-8 h-8" />} 
              iconColor="text-orange-500"
            />
            <StatsCard 
              title="Indexes" 
              value={dbStats.indexes} 
              icon={<FaCog className="w-8 h-8" />} 
              iconColor="text-red-500"
            />
            <StatsCard 
              title="Objects" 
              value={dbStats.objects} 
              icon={<FaListOl className="w-8 h-8" />} 
              iconColor="text-indigo-500"
            />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DatabaseStats;
