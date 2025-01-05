import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Spin, Empty, Pagination } from 'antd';
import { useSelector } from 'react-redux';
import Nav from '../Nav';
import { ReloadOutlined } from "@ant-design/icons";

// SVG Icons
const ComputerIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-500"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 4.5h16.5a2.25 2.25 0 012.25 2.25v9.75a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 16.5V6.75A2.25 2.25 0 013.75 4.5zm6.75 13.5v2.25m-4.5 0h9"
        />
    </svg>
);

const TableIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-green-500"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 16.5V6.75z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9h18M9 19.5v-9m6 9v-9"
        />
    </svg>
);

function OverviewR() {
    const sessionId = useSelector((state) => state.session.value);
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 7;

    const fetchRooms = async () => {
        if (!sessionId) {
            setError('No session ID found.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8081/admin/session/${sessionId}/rooms`);
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }

            const data = await response.json();
            setRooms(data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [sessionId]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRooms = rooms.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="h-screen">
            <Nav />
            <section className="ml-12 transition-all duration-300 peer-hover:ml-64 h-screen dark:bg-gray-900">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        {error && (
                            <div className="text-center text-red-500 mb-4">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            {rooms.length === 0 ? (
                                <div className="flex justify-center items-center py-10">
                                    <Empty description="No Data Found" />
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-end p-3">
                                        <button
                                            onClick={fetchRooms}
                                            type="button"
                                            className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                                        >
                                            <ReloadOutlined />
                                            Reload
                                        </button>
                                    </div>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">
                                                Classroom
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Capacity
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Type
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {paginatedRooms.map((room, index) => (
                                            <tr key={index} className="border-b dark:border-gray-700">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex gap-4 items-center">
                                                        {room.type === 'Lab' ? <ComputerIcon /> : <TableIcon />}
                                                        <div>
                                                            <h2>{room.nameRoom}</h2>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="px-4 py-3">{room.capacity}</td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        status={
                                                            room.type === 'course'
                                                                ? 'success'
                                                                : room.type === 'Lab'
                                                                    ? 'processing'
                                                                    : 'default'
                                                        }
                                                    />
                                                    {room.type}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-center p-3">
                                        <Pagination
                                            current={currentPage}
                                            total={rooms.length}
                                            pageSize={itemsPerPage}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OverviewR;
