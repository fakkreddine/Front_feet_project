import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Spin,Tooltip } from 'antd';
import img from "../../assets/edit.png";
import { useSelector } from 'react-redux';
import { PlusOutlined,DeleteFilled,ReloadOutlined  } from '@ant-design/icons';

function Overviewt() {
    const sessionId = useSelector((state) => state.session.value);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8081/admin/session/${sessionId}/teachers`);
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }

      const data = await response.json();
      setTeachers(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchTeachers();
  }, []);


  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className=" shadow-lg border border-gray-200 rounded-lg p-6 mr-7 ">
      <div className="px-6">
        <div className="overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
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
            <button onClick={fetchTeachers}
                    type="button"
                    className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                  >
                   < ReloadOutlined/>
                    Relode
                  </button>
          </div>
          <div className="overflow-x-auto">

            {loading?<div className=" relative flex justify-center py-10">
                                  <Spin size="large" />
                                </div>:
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="px-4 py-3">CIN</th>
                  <th scope="col" className="px-4 py-3">UID</th>
                  <th scope="col" className="px-4 py-3">Email</th>
                  <th scope="col" className="px-4 py-3">Subjects Can Teach</th>
                  <th scope="col" className="px-4 py-3">Time Slots</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>

                { teachers.map((teacher, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex gap-4 items-center">
                        <Avatar size={30} src={img} />
                        <div>
                          <h2>{teacher.teacherName}</h2>
                          <p className="text-gray-400 font-normal">{teacher.email}</p>
                        </div>
                      </div>
                    </th>
                    <td className="px-4 py-3">{teacher.cin}</td>
                    <td className="px-4 py-3">{teacher.id }<Tooltip title="ID in mongodb">  <span class="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold    rounded-full dark:bg-gray-700 dark:text-blue-400">
<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
</svg>
<span class="sr-only">Icon description</span>
</span></Tooltip></td>
                    <td className="px-4 py-3">{teacher.email}</td>
                    <td className="px-4 py-3 "><span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"> {teacher.subjectsCanTeach || 'N/A'}</span></td>
                    <td className="px-4 py-3"><span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{teacher.timeSlots || 'N/A'}</span></td>
                    <td className="px-4 py-3">

                    <span class={teacher.valide?"bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300":"bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"}>{teacher.valide ? 'Active' : 'Inactive'} 
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
  );
}

export default Overviewt;
