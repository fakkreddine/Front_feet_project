import React, { useEffect, useState } from 'react';
import Nav from "../../component/Nav";
import Aside_v2_teacher from '../../component/Aside_v2_teacher';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useAuth } from '../../Auth/AuthContext';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

function TeacherDash() {
  const sessionId = useSelector((state) => state.session.value);
  const { userDetails, user } = useAuth();
  const [timetable, setTimetable] = useState([]);
  const [info, setinfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        `http://localhost:8081/admin/session/${sessionId}/teacher/${user.reloadUserInfo?.localId}`
      );
setinfo(response)
console.log(response)
      const { data: response2 = [] } = await axios.get(
        `http://localhost:5000/get-timetable-by-teacher-and-session?teacherName=${response?.teacherName}&sessionId=${sessionId}`
      );

      setTimetable(response2.timetable || []);
    } catch (error) {
      console.error("Failed to fetch timetable data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTimetable = () => {
    if (!timetable || timetable.length === 0) {
      return <div className="text-gray-500 mt-4">No timetable available.</div>;
    }

    const timeSlots = [
      "08:30 - 10:00", "10:00 - 11:30", "11:30 - 13:00", 
      "13:00 - 14:30", "14:30 - 16:00", "16:00 - 17:30"
    ];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const splitTimeSlot = (entry) => {
      const { time_slot, ...rest } = entry;
      const [start, end] = time_slot.split(" - ");
      const splitSlots = [];

      for (let i = 0; i < timeSlots.length; i++) {
        const [slotStart, slotEnd] = timeSlots[i].split(" - ");
        if (start < slotEnd && end > slotStart) {
          splitSlots.push({ ...rest, time_slot: timeSlots[i] });
        }
      }

      return splitSlots;
    };

    const processedTimetableData = timetable.flatMap(splitTimeSlot);

    const groupedTimetable = processedTimetableData.reduce((acc, item) => {
      if (!acc[item.teacher]) {
        acc[item.teacher] = [];
      }
      acc[item.teacher].push(item);
      return acc;
    }, {});

    return (
      <div className=" w-full h-full mb-4">
        {Object.keys(groupedTimetable).map((teacher) => (<><h2 className="text-xl font-semibold">Your Schedule {info.teacherName}</h2>
          <div key={teacher} className="mt-6 pr-6 w-full h-full">
            
            <table className=" min-w-full  w-full h-full table-auto mt-4 border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Time Slot</th>
                  {daysOfWeek.map((day) => (
                    <th key={day} className="px-4 py-2 border">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot}>
                    <td className="px-4 py-2 border">{timeSlot}</td>
                    {daysOfWeek.map((day) => {
                      const entries = groupedTimetable[teacher].filter(
                        entry => entry.time_slot === timeSlot && entry.day === day
                      );
                      return (
                        <td key={day} className="px-4 py-2 border">
                          {entries.length > 0 ? (
                            entries.map((entry, index) => (
                              <div key={index} className="mb-2">
                                <strong>{entry.subject}</strong> <br />
                                {entry.room}
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-500">No classes scheduled</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div></>
         
        ))}
      </div>
    );
  };

  return (
    <>
      <Nav />
      <Aside_v2_teacher />

      
      <div className="ml-24 pl-5 mt-20 transition-all duration-300 peer-hover:ml-64 h-screen">

         <nav className="flex" aria-label="Breadcrumb">
                      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                          <Link 
                            to="/home"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                          >
                            <svg
                              className="w-3 h-3 me-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                          </Link>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <svg
                              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 6 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                              />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                            Timetable
                            </span>
                          </div>
                        </li>
                      </ol>
                    </nav>
        <div className="mt-6 w-full h-full">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            renderTimetable()
          )}
        </div>
      </div>
    </>
  );
}

export default TeacherDash;
