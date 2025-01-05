import React, { useEffect, useState } from 'react';
import { Avatar, Spin, Tooltip } from 'antd';
import img from "../../assets/edit.png";
import { useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';

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
    <section className="shadow-lg border border-gray-200 rounded-lg p-6 mr-7">
      <div className="px-6">
        <div className="overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <button
              onClick={fetchTeachers}
              type="button"
              className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 gap-3"
            >
              <ReloadOutlined />
              Reload
            </button>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="relative flex justify-center py-10">
                <Spin size="large" />
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="border-b">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900">
                        <div className="flex gap-4 items-center">
                          <Avatar size={30} src={img} />
                          <div>
                            <h2>{teacher.teacherName}</h2>
                            <p className="text-gray-400 font-normal">{teacher.email}</p>
                          </div>
                        </div>
                      </th>
                      <td className="px-4 py-3">{teacher.cin}</td>
                      <td className="px-4 py-3">{teacher.id}</td>
                      <td className="px-4 py-3">{teacher.email}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {Array.isArray(teacher.subjectsCanTeach) && teacher.subjectsCanTeach.length > 0 ? (
                            <>
                              <span>{teacher.subjectsCanTeach[Math.floor(Math.random() * teacher.subjectsCanTeach.length)].subjectName}</span>
                              {teacher.subjectsCanTeach.length > 1 && (
                                <Tooltip title={teacher.subjectsCanTeach.map(sub => sub.subjectName).join(', ')}>
                                  <span className="cursor-pointer text-gray-400">...</span>
                                </Tooltip>
                              )}
                            </>
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {Array.isArray(teacher.timeSlots) && teacher.timeSlots.length > 0 ? (
                            <>
                              <span>{teacher.timeSlots[Math.floor(Math.random() * teacher.timeSlots.length)].day}</span>
                              {teacher.timeSlots.length > 1 && (
                                <Tooltip title={teacher.timeSlots.join(', ')}>
                                  <span className="cursor-pointer text-gray-400">...</span>
                                </Tooltip>
                              )}
                            </>
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            teacher.valide
                              ? "bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                              : "bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                          }
                        >
                          {teacher.valide ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overviewt;
