import React, { useEffect, useState } from 'react';
import Nav from '../../component/Nav';
import Aside_v2_student from '../../component/Aside_v2_student';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useAuth } from '../../Auth/AuthContext';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentDash = () => {
    const sessionId = useSelector((state) => state.session.value);
    const { user } = useAuth();
    const [timetable, setTimetable] = useState([]);
    const [Grouprep, setStudentInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTimetable = async () => {
        if (!sessionId || !user?.reloadUserInfo?.localId) {
            setError('Missing session or student information.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data: Grouprep } = await axios.get(
                `http://localhost:5000/get-group-by-student-id?studentId=${user.reloadUserInfo.localId}&sessionId=${sessionId}`
            );
            setStudentInfo(Grouprep);

            const { data: timetableResponse = [] } = await axios.get(
                `http://localhost:5000/get-timetable-by-group-and-session?groupName=${Grouprep?.group_name}&sessionId=${sessionId}`
            );

            setTimetable(timetableResponse.timetable || []);
        } catch (error) {
            setError('Failed to fetch timetable.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetable();
    }, []);

    const timeSlots = [
        '08:30 - 10:00',
        '10:00 - 11:30',
        '11:30 - 13:00',
        '13:00 - 14:30',
        '14:30 - 16:00',
        '16:00 - 17:30',
    ];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const splitTimeSlot = (entry) => {
        const { time_slot, ...rest } = entry;
        const [start, end] = time_slot.split(' - ');
        const splitSlots = [];

        for (let i = 0; i < timeSlots.length; i++) {
            const [slotStart, slotEnd] = timeSlots[i].split(' - ');
            if (start < slotEnd && end > slotStart) {
                splitSlots.push({ ...rest, time_slot: timeSlots[i] });
            }
        }

        return splitSlots;
    };

    const processedTimetableData = timetable.flatMap(splitTimeSlot);

    const groupedTimetable = processedTimetableData.reduce((acc, item) => {
        if (!acc[item.groupName]) {
            acc[item.groupName] = [];
        }
        acc[item.groupName].push(item);
        return acc;
    }, {});

    const renderTimetable = () => {
        if (!timetable || timetable.length === 0) {
            return <div className="mt-4">No timetable available.</div>;
        }

        return (
            <div>
                {Object.keys(groupedTimetable).map((group) => (
                    <div key={group} className="mt-6">
                        <h2 className="text-lg font-bold text-gray-700">{group}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto mt-4 border-collapse border border-gray-200 rounded-lg shadow-sm">
                                <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 border text-left">Time Slot</th>
                                    {daysOfWeek.map((day) => (
                                        <th key={day} className="px-4 py-3 border text-left">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {timeSlots.map((timeSlot, index) => (
                                    <tr
                                        key={timeSlot}
                                        className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                    >
                                        <td className="px-4 py-2 border">{timeSlot}</td>
                                        {daysOfWeek.map((day) => {
                                            const entries = groupedTimetable[group].filter(
                                                (entry) =>
                                                    entry.time_slot === timeSlot && entry.day === day
                                            );
                                            return (
                                                <td key={day} className="px-4 py-2 border">
                                                    {entries.length > 0 ? (
                                                        entries.map((entry, index) => (
                                                            <div key={index} className="mb-2">
                                                                <strong className="text-blue-600">
                                                                    {entry.subject}
                                                                </strong>
                                                                <br />
                                                                <span className="text-sm text-gray-600">
                                                                        {entry.teacher}
                                                                    </span>
                                                                <br />
                                                                <span className="text-sm text-gray-600">
                                                                        {entry.room}
                                                                    </span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-gray-500">
                                                            No classes scheduled
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const downloadTimetableAsPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Student Timetable', 10, 10);

        Object.keys(groupedTimetable).forEach((group, index) => {
            if (index > 0) doc.addPage();
            doc.setFontSize(14);
            doc.text(`Group: ${group}`, 10, 20);

            const tableData = timeSlots.map((timeSlot) => {
                const row = [timeSlot];
                daysOfWeek.forEach((day) => {
                    const entries = groupedTimetable[group].filter(
                        (entry) => entry.time_slot === timeSlot && entry.day === day
                    );
                    row.push(
                        entries.length > 0
                            ? entries
                                .map((entry) => `${entry.subject} (${entry.teacher}, ${entry.room})`)
                                .join('\n')
                            : 'No classes'
                    );
                });
                return row;
            });

            doc.autoTable({
                startY: 30,
                head: [['Time Slot', ...daysOfWeek]],
                body: tableData,
            });
        });

        doc.save('timetable.pdf');
    };

    return (
        <>
            <Nav />
            <Aside_v2_student />
            <div className="mt-15 pt-20 ml-24 pl-5 transition-all duration-300 peer-hover:ml-64 h-screen p-4">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link
                                to="/home"
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                    Timetable
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <Spin size="large" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={downloadTimetableAsPDF}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                            >
                                Download as PDF
                            </button>
                        </div>
                        {renderTimetable()}
                    </>
                )}
            </div>
        </>
    );
};

export default StudentDash;
