import React, { useEffect, useState } from 'react';
import { Avatar, Badge } from 'antd';
import { useSelector } from 'react-redux'; 
import img from "../../assets/edit.png";
import Nav from '../Nav'
import Aside from '../Aside' 
import Aside_v2 from '../Aside_v2';
import { PlusOutlined,DeleteFilled,ReloadOutlined  } from '@ant-design/icons';
import { Empty, Spin } from 'antd'; // Import Spin for loading indicator

function OverviewG() {
  const sessionId = useSelector((state) => state.session.value); 
  const [groups, setGroups] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  const fetchGroups = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/get-group-names?sessionId=${sessionId}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
        console.log(response)
      }

      const data = await response.json();
      setGroups(data.group_names || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found.');
      setLoading(false);
      return;
    }


    fetchGroups();
  }, [sessionId]); // Re-run when sessionId changes

 

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (

    <div className="  ">

   
      
      <div className="">
        <Nav />
        
        
        
        <section className="  ">
          <div className="px-10 p-8">
            <div className="reltive overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </div>
                <button onClick={fetchGroups}
                    type="button"
                    className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                  >
                   < ReloadOutlined/>
                    Relode
                  </button>
              </div>

              <div className="overflow-x-auto">
                {loading? <div className="relative flex justify-center py-10">
        <Spin size="large" />
      </div>:
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Group Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Students Count
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex gap-4 items-center">
                            <Avatar size={30} src={img} />
                            <div>
                              <h2>{group}</h2>
                            </div>
                          </div>
                        </th>
                        <td className="px-4 py-3">{console.log(groups)}</td>
                        <td className="px-4 py-3">
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                Active
            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OverviewG;
