import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import Aside_v2 from '../component/Aside_v2';
import Nav from "../component/Nav";
import { Link } from 'react-router-dom';

const Loader = () => (
    <div className="flex justify-center items-center h-full">
      <div className="loader"></div>
    </div>
);

const SchedulePage = () => {
  const sessionId = useSelector((state) => state.session.value);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [timetableData, setTimetableData] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found.");
      return;
    }

    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/sessions/${sessionId}`);
        const session = response.data;

        if (session?.department?.length > 0) {
          const groupsList = session.department[0]?.groups || [];
          setGroups(groupsList);
        } else {
          setError("No valid department data found.");
        }
      } catch (err) {
        setError("Failed to fetch session data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [sessionId]);

  const handleGenerateTimetable = async () => {
    if (!sessionId) {
      setError("Session ID is missing.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:5000/generate-timetable', { sessionId });
      setSuccessMessage("Timetable generated successfully!");
      setTimetableData(response.data.timetables); // Set the timetable data received from the API
    } catch (err) {
      setError("Failed to generate timetable.");
    } finally {
      setLoading(false);
    }
  };

  const handleGroupChange = async (event) => {
    const groupName = event.target.value;
    setSelectedGroup(groupName);
    setLoading(true);
    setError(null);
    setTimetableData([]);

    try {
      const response = await axios.get(`http://localhost:5000/get-timetable-by-group-and-session?groupName=${groupName}&sessionId=${sessionId}`);
      const fetchedData = response.data.timetable;

      if (Array.isArray(fetchedData)) {
        setTimetableData(fetchedData);
      } else {
        setError("Invalid timetable data format.");
      }
    } catch (err) {
      setError("Failed to fetch timetable.");
    } finally {
      setLoading(false);
    }
  };

  const renderTimetable = () => {
    if (!timetableData || timetableData.length === 0) {
      return <div className="text-gray-500 mt-4">No timetable available.</div>;
    }

    const timeSlots = [
      "08:30 - 10:00", "10:00 - 11:30", "11:30 - 13:00", "13:00 - 14:30", "14:30 - 16:00", "16:00 - 17:30"
    ];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Helper function to split time slots
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

    const processedTimetableData = timetableData.flatMap(splitTimeSlot);

    const groupedTimetable = processedTimetableData.reduce((acc, item) => {
      if (!acc[item.group_name]) {
        acc[item.group_name] = [];
      }
      acc[item.group_name].push(item);
      return acc;
    }, {});

    return (
        <div>
          {Object.keys(groupedTimetable).map((group) => (
              <div key={group} className="mt-6">
                <h2 className="text-xl font-semibold">{group}</h2>
                <table className="min-w-full table-auto mt-4 border-collapse border border-gray-200">
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
                          const entries = groupedTimetable[group].filter(entry => entry.time_slot === timeSlot && entry.day === day);
                          return (
                              <td key={day} className="px-4 py-2 border">
                                {entries.length > 0 ? (
                                    entries.map((entry, index) => (
                                        <div key={index} className="mb-2">
                                          <strong>{entry.subject}</strong> <br />
                                          {entry.teacher} <br />
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
              </div>
          ))}
        </div>
    );
  };

  return (
      <>
        <Nav />
        <Aside_v2 />
        <div className="mt-15 pt-20 ml-24 pl-5 transition-all duration-300 peer-hover:ml-64 h-screen">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <span className="mx-2 text-gray-500">/</span>
              </li>
              <li className="inline-flex items-center text-gray-700">Schedule</li>
            </ol>
          </nav>

          <div className="mt-6">
            <div className="flex items-center">
              <select
                  value={selectedGroup}
                  onChange={handleGroupChange}
                  className="px-4 py-2 border rounded-md"
              >
                <option value="">Select a Group</option>
                {groups.map((group) => (
                    <option key={group._id} value={group.groupName}>
                      {group.groupName}
                    </option>
                ))}
              </select>

              <button
                  onClick={handleGenerateTimetable}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Generate Timetable
              </button>
            </div>

            {loading && <Loader />}
            {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
            {error && <div className="text-red-500 mt-4">{error}</div>}

            {renderTimetable()}
          </div>
        </div>
      </>
  );
};

export default SchedulePage;
