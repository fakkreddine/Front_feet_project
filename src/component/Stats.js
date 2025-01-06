import React, { useEffect, useState } from 'react';
import { Badge, Card, Skeleton } from 'antd';
import axios from 'axios';

function Stats(props) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchdata = async () => {
    setLoading(true);

    try {
      if (props?.subject) {
        const { data: response1 = [] } = await axios.get(props?.api[0]);
        const { data: response2 = [] } = await axios.get(props?.api[1]);
        const combinedData = [...response1, ...response2]; // Properly merge arrays
        setData(combinedData);
      } else {
        const { data: response = [] } = await axios.get(props?.api);
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, []); // Add dependencies to re-fetch if these props change

  return (
    <div className="w-full h-full">
      <Card bordered={false}>
        {loading ? (
          // Display loading spinner or skeleton when loading
          <Skeleton  avatar active />
        ) : (
          // Render the main content when not loading
          <>
            <div className="flex justify-between">
              <img
                className="w-12 h-12 object-contain"
                src={props.img}
                alt="Icon"
              />
              <h3 className="ubuntu-medium text-sm font-normal lg:text-lg dark:text-gray-400">
                {props.text}
              </h3>
            </div>
            <div className="flex justify-end">
              <p
                className="text-gray-500 font-medium"
                style={{ color: '#192c4d' }}
              >
                {Array.isArray(data) ? data.length : data} {/* Display count or data */}
              </p>
            </div>
            <div className="flex">
              <Badge
                className="site-badge-count-109"
                count={'+3%'}
                style={{ backgroundColor: '#52c41a' }}
              />
              <p className="mx-2 text-gray-500">Than Last Week</p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default Stats;
