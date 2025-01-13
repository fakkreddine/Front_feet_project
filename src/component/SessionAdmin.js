import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import Aside_v2 from './Aside_v2_admin';
import Nav from "./Nav";

const SessionAdmin = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all sessions from the API when the component mounts
        const fetchSessions = async () => {
            try {
                const response = await fetch('http://localhost:5000/get-all-sessions'); // Adjust URL based on your backend
                if (!response.ok) {
                    throw new Error('Failed to fetch sessions');
                }
                const data = await response.json();
                // Ensure the response contains the sessions array
                if (data.sessions) {
                    setSessions(data.sessions); // Set sessions array directly
                } else {
                    setError('No sessions data available');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSessions();
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Nav Bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
                <Nav />
            </div>
            {/* Aside Sidebar */}
            <div style={{ position: 'fixed', top: '60px', left: 0, width: '200px', height: 'calc(100vh - 60px)', zIndex: 999 }}>
                <Aside_v2 />
            </div>
            {/* Main Content Area */}
            <div style={{ marginLeft: '200px', marginTop: '60px', padding: '20px', flexGrow: 1 }}>
                <h1>Sessions</h1>
                {error && <p>Error: {error}</p>}
                {sessions.length === 0 ? (
                    <p>No sessions found.</p>
                ) : (
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>University Name</Table.HeadCell>
                            <Table.HeadCell>Year</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {sessions.map((session) => (
                                <Table.Row key={session._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{session.universityName}</Table.Cell>
                                    <Table.Cell>{session.year}</Table.Cell>
                                    <Table.Cell>
                                        <button className="text-blue-500 hover:text-blue-700">Edit</button>
                                        <button className="ml-2 text-red-500 hover:text-red-700">Delete</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default SessionAdmin;
