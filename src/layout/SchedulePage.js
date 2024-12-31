import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Aside from "../component/Aside";
import Nav from "../component/Nav";

const SchedulePage = () => {
  const sessionId = useSelector((state) => state.session.value);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [timetableData, setTimetableData] = useState(null);
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
      await axios.post('http://localhost:5000/generate-timetable', { sessionId });
      setSuccessMessage("Timetable generated successfully!");
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
    setTimetableData(null);

    try {
      const response = await axios.get(`http://localhost:5000/get-timetable-by-group?groupName=${groupName}`);
      setTimetableData(response.data.timetable);
    } catch (err) {
      setError("Failed to fetch timetable.");
    } finally {
      setLoading(false);
    }
  };

  const renderTimetable = () => {
    if (!timetableData) return <div className="text-gray-500 mt-4">No timetable available.</div>;

    const timeSlots = [
      "08:30 - 10:00", "11:30 - 13:00", "13:00 - 14:30", "14:30 - 16:00", "16:00 - 17:30",
    ];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
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
                const entries = timetableData[timeSlot]?.[day] || [];
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
    );
  };

  return (
    <>
      <Nav />
      <Aside />
      <div className="container mx-auto p-4 pt-20 ml-64">
        <h1 className="text-2xl font-bold">Schedule Page</h1>
        <div className="mt-4">
          <button
            onClick={handleGenerateTimetable}
            className={`p-2 rounded ${loading ? "bg-gray-500" : "bg-blue-500 text-white"}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Timetable"}
          </button>
          {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <div className="mt-4">
          <select
            value={selectedGroup}
            onChange={handleGroupChange}
            className="p-2 border rounded w-full max-w-sm"
          >
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.groupName} value={group.groupName}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>
        {renderTimetable()}
      </div>
    </>
  );
};

export default SchedulePage;
