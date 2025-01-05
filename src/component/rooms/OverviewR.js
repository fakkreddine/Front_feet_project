import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Spin, Empty } from 'antd';
import { useSelector } from 'react-redux';
import img from "../../assets/edit.png";
import Nav from '../Nav';

function OverviewR() {
    const sessionId = useSelector((state) => state.session.value);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <br />
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
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Name Room
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
                                    {rooms.map((room, index) => (
                                        <tr key={index} className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="flex gap-4 items-center">
                                                    <Avatar size={30} src={img} />
                                                    <div>
                                                        <h2>{room.nameRoom}</h2>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-4 py-3">{room.capacity}</td>
                                            <td className="px-4 py-3">
                                                <Badge status={room.type === 'course' ? 'success' : room.type === 'Lab' ? 'processing' : 'default'} />
                                                {room.type}
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
        </div>
    );
}

export default OverviewR;
