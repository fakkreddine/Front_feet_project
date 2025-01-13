import React, { useEffect, useState } from "react";
import axios from "axios";
import Aside_v2 from "./Aside_v2_admin";
import Nav from "./Nav";
import { Spin } from "antd";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roleMap, setRoleMap] = useState({}); // To store roles for each user
    const [filteredUsers, setFilteredUsers] = useState([]); // To store filtered users
    const [searchQuery, setSearchQuery] = useState(""); // To store the search query
    const [showModal, setShowModal] = useState(false); // To manage modal visibility
    const [sessions, setSessions] = useState([]); // To store fetched sessions
    const [selectedSession, setSelectedSession] = useState(null); // To store the selected session
    const [selectedAdminId, setSelectedAdminId] = useState(null); // To store the selected admin ID
    const [currentPage, setCurrentPage] = useState(1); // To manage current page for pagination
    const [itemsPerPage] = useState(10); // Items per page for pagination

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/get-all-users");
                const fetchedUsers = response.data.users || [];
                setUsers(fetchedUsers);

                // Fetch roles for each user
                const rolePromises = fetchedUsers.map(async (user) => {
                    try {
                        const roleResponse = await axios.get(`http://localhost:8081/roles/${user.uid}`);
                        return { uid: user.uid, role: roleResponse.data.roleUser };
                    } catch (err) {
                        if (err.response && err.response.status === 500) {
                            return { uid: user.uid, role: "N/A" };
                        }
                        return { uid: user.uid, role: "Error" };
                    }
                });

                const roleResults = await Promise.all(rolePromises);
                const roleMap = roleResults.reduce((acc, { uid, role }) => {
                    acc[uid] = role;
                    return acc;
                }, {});
                setRoleMap(roleMap);

                // Filter users to only show Admin and N/A roles
                const filtered = fetchedUsers.filter((user) => roleMap[user.uid] === "Admin" || roleMap[user.uid] === "N/A");
                setFilteredUsers(filtered);
            } catch (err) {
                setError("Error fetching users: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [roleMap]);

    // Function to handle opening the modal
    const openModal = async (adminId) => {
        setSelectedAdminId(adminId); // Store the selected admin ID
        try {
            const response = await axios.get("http://localhost:5000/get-all-sessions");
            if (response.data.sessions) {
                setSessions(response.data.sessions);
                setShowModal(true);
            } else {
                alert("No sessions found.");
            }
        } catch (err) {
            alert("Error fetching sessions: " + err.message);
        }
    };

    // Function to handle session selection
    const handleSessionSelect = (session) => {
        setSelectedSession(session);
    };

    // Function to handle session submission and add session to admin
    const addSessionToUser = async () => {
        if (!selectedSession) {
            alert("Please select a session.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/add_session_to_admin", {
                adminId: selectedAdminId, // Use the selected admin ID
                sessionId: selectedSession._id
            });
            alert(response.data.message); // Optionally show a message
            setShowModal(false); // Close modal after session is added
        } catch (err) {
            alert("Error adding session: " + err.message);
        }
    };

    // Function to make a user an admin
    const makeAdmin = async (uid) => {
        try {
            const response = await axios.post("http://localhost:5000/make_admin", {
                adminId: uid,
            });
            alert(response.data.message); // Optionally show a message
        } catch (err) {
            alert("Error making admin: " + err.message);
        }
    };

    // Function to handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter users based on search query
    const filteredBySearch = filteredUsers.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user.uid.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.displayName.toLowerCase().includes(query)
        );
    });

    // Pagination handling
    const totalPages = Math.ceil(filteredBySearch.length / itemsPerPage);
    const currentUsers = filteredBySearch.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <Aside_v2 />
            <Nav />
            <div className="ml-24 transition-all duration-300 peer-hover:ml-64 h-screen dark:bg-gray-900 mt-20 "><h1 className="text-2xl font-bold mb-4">Users List</h1>
            {/* Search input */}
            <div className="p-8 rounded-md shadow-md border-gray-200 w-full h-4/5 mx-auto border">
                <form className="flex items-center max-w-lg mx-auto mb-4">
                    <label htmlFor="voice-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="voice-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Users UID ROLE."
                            value={searchQuery}
                            onChange={handleSearchChange}  // Corrected this line
                            required
                        />
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <button type="submit"
                            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        Search
                    </button>
                </form>

                <div className="relative overflow-x-auto p-6">
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3">UID</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">Display Name</th>
                            <th scope="col" className="px-4 py-3">Role</th>
                            <th scope="col" className="px-4 py-3">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.uid} className="border-b">
                                <td className="px-4 py-2">{user.uid}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.displayName}</td>
                                <td className="px-4 py-2">{roleMap[user.uid] || "N/A"}</td>
                                <td className="px-4 py-2">
                                    {roleMap[user.uid] === "N/A" ? (
                                        <button
                                            onClick={() => makeAdmin(user.uid)}
                                            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => openModal(user.uid)} // Pass adminId when opening modal
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            Add Session
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({length: totalPages}, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    aria-current={currentPage === index + 1 ? "page" : undefined}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                        currentPage === index + 1
                                            ? "text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                            : ""
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 max-h-[400px] overflow-y-auto max-w-lg w-full">
                        <h3 className="text-xl mb-4">Select Session for Admin</h3>
                        <ul>
                            {sessions.map((session) => (
                                <li key={session._id} className="mb-2">
                                    <button
                                        onClick={() => handleSessionSelect(session)}
                                        className={`p-2 rounded-lg ${
                                            selectedSession === session
                                                ? "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                                : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        }`}
                                    >
                                        {session._id}-{session.universityName}--{session.year}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="p-4 md:p-5 text-center">
                            <button
                                onClick={addSessionToUser}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Add Session
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                data-modal-hide="popup-modal" type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

</div>
            
        </div>
    );
};

export default UsersTable;
