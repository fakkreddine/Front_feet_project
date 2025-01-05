import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import "./Pag.css";
import {ReloadOutlined} from "@ant-design/icons";

const Manage_rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        nameRoom: "",
        capacity: "",
        type: "",
    });
    const [editedRoom, setEditedRoom] = useState({
        roomId: "",
        nameRoom: "",
        capacity: "",
        type: "",
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const sessionId = useSelector((state) => state.session.value);
    const API_BASE_URL = "http://localhost:8081";

    useEffect(() => {
        fetchRooms(sessionId);
    }, [sessionId]);

    const fetchRooms = async (sessionId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/admin/session/${sessionId}/rooms`
            );
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching Rooms:", error);
            setError("Failed to load Rooms");
        }
    };

    const handleAddRoom = async () => {
        if (!newRoom.nameRoom) {
            setError("Enter Room name");
            return;
        }
        if (!newRoom.capacity) {
            setError("Enter Room Capacity");
            return;
        }
        if (!newRoom.type) {
            setError("Select Room Type");
            return;
        }

        try {
            await axios.post(
                `${API_BASE_URL}/admin/session/${sessionId}/rooms`,
                newRoom
            );
            fetchRooms(sessionId);
            closeModal();
        } catch (err) {
            console.error("Error adding Room:", err);
            setError("Failed to add room");
        }
    };

    const handleEditRoom = (room) => {
        setIsEditing(true);
        setEditedRoom({
            roomId: room.roomId,
            nameRoom: room.nameRoom,
            capacity: room.capacity,
            type: room.type,
        });
        setModalOpen(true);
    };

    const handleUpdateRoom = async () => {
        if (!editedRoom.nameRoom || !editedRoom.capacity || !editedRoom.type) {
            setError("All fields are required!");
            return;
        }

        try {
            await axios.put(
                `${API_BASE_URL}/admin/session/${sessionId}/rooms/${editedRoom.roomId}`,
                editedRoom
            );
            fetchRooms(sessionId);
            closeModal();
        } catch (err) {
            console.error("Error updating room:", err);
            setError("Failed to update room");
        }
    };

    const openDeleteModal = (room) => {
        setRoomToDelete(room);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setRoomToDelete(null);
    };

    const handleDeleteRoom = async () => {
        if (roomToDelete) {
            try {
                await axios.delete(
                    `${API_BASE_URL}/admin/session/${sessionId}/rooms/${roomToDelete.roomId}`
                );
                fetchRooms(sessionId);
                closeDeleteModal();
            } catch (err) {
                console.error("Error deleting room:", err);
                setError("Failed to delete room");
            }
        }
    };

    const openModal = () => {
        setIsEditing(false);
        setNewRoom({ nameRoom: "", capacity: "", type: "" });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setError(null);
    };

    const filteredRooms = rooms.filter((room) =>
        room.nameRoom && room.nameRoom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRoom = currentPage * itemsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
    const currentRooms = filteredRooms.slice(
        indexOfFirstRoom,
        indexOfLastRoom
    );

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setNewRoom((prevState) => {
            return { ...prevState, type: value };
        });
        if (isEditing) {
            setEditedRoom((prevState) => {
                return { ...prevState, type: value };
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div
                className="flex-1 flex flex-col p-6 overflow-y-auto m ml-24 transition-all duration-300 peer-hover:ml-64 h-screen">
                <div className="bg-white p-6 rounded-md shadow-md w-full mx-auto border border-gray-200">
                    <form className="flex items-center max-w-lg mx-auto mb-4">
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400 dark:text-gray-300" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="voice-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Rooms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                required
                            />
                        </div>
                    </form>

                    <div className="flex justify-end mb-4 space-x-2">
                        <button
                            onClick={openModal}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300"
                        >
                            + Add New Classroom
                        </button>
                        <button
                            onClick={() => fetchRooms(sessionId)}
                            className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                        ><ReloadOutlined />
                            Reload
                        </button>
                    </div>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3">ID</th>
                                <th scope="col" className="px-4 py-3">Room Name</th>
                                <th scope="col" className="px-4 py-3">Capacity</th>
                                <th scope="col" className="px-4 py-3">Type</th>
                                <th scope="col" className="px-4 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentRooms.map((room, index) => (
                                <tr key={room.roomId}
                                    className="border-b bg-white hover:bg-gray-100 transition duration-200 ease-in-out">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{room.nameRoom}</td>
                                    <td className="px-4 py-2">{room.capacity}</td>
                                    <td className="px-4 py-2">{room.type}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                            onClick={() => handleEditRoom(room)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800 text-sm"
                                            onClick={() => openDeleteModal(room)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {modalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-md shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">
                                    {isEditing ? "Edit Room" : "Add New Room"}
                                </h2>
                                <div className="mb-4">
                                    <label className="block mb-2">Room Name</label>
                                    <input
                                        type="text"
                                        className="border p-2 w-full rounded"
                                        value={isEditing ? editedRoom.nameRoom : newRoom.nameRoom}
                                        onChange={(e) =>
                                            isEditing
                                                ? setEditedRoom({
                                                    ...editedRoom,
                                                    nameRoom: e.target.value,
                                                })
                                                : setNewRoom({...newRoom, nameRoom: e.target.value})
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Capacity</label>
                                    <input
                                        type="text"
                                        className="border p-2 w-full rounded"
                                        value={isEditing ? editedRoom.capacity : newRoom.capacity}
                                        onChange={(e) =>
                                            isEditing
                                                ? setEditedRoom({
                                                    ...editedRoom,
                                                    capacity: e.target.value,
                                                })
                                                : setNewRoom({...newRoom, capacity: e.target.value})
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Room Type</label>
                                    <div className="flex items-center">
                                        <label className="mr-4">
                                            <input
                                                type="radio"
                                                value="lab"
                                                checked={isEditing ? editedRoom.type === "lab" : newRoom.type === "lab"}
                                                onChange={handleTypeChange}
                                            />
                                            Lab
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="course"
                                                checked={isEditing ? editedRoom.type === "course" : newRoom.type === "course"}
                                                onChange={handleTypeChange}
                                            />
                                            Course
                                        </label>
                                    </div>
                                </div>

                                {error && <p className="text-red-500">{error}</p>}

                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={isEditing ? handleUpdateRoom : handleAddRoom}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        {isEditing ? "Update Room" : "Add Room"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {deleteModalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-md shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">Delete Room</h2>
                                <p>Are you sure you want to delete this room?</p>

                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={closeDeleteModal}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteRoom}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Manage_rooms;
