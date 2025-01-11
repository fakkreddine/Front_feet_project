import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Nav from "../component/Nav";
import Aside_v2 from '../component/Aside_v2';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Loader = () => (
    <div className="flex justify-center items-center h-full">
        <div className="loader"></div>
    </div>
);

const EmploiMan = () => {
    const sessionId = useSelector((state) => state.session.value);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [programData, setProgramData] = useState(null);
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

    const fetchGroupProgram = async (groupId) => {
        if (!sessionId || !groupId) {
            setError("Session ID or Group ID is missing.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const selectedGroupData = groups.find(group => group._id === groupId);
            const groupName = selectedGroupData?.groupName;

            if (!groupName) {
                setError("Group name not found for the selected group.");
                return;
            }

            const departmentResponse = await axios.get(
                `http://localhost:5000/get-department-id-by-group?groupName=${groupName}&sessionId=${sessionId}`
            );
            const departmentId = departmentResponse.data?.departmentId;

            if (!departmentId) {
                setError("Department ID not found for the selected group.");
                return;
            }

            const programResponse = await axios.get(
                `http://localhost:8081/admin/session/${sessionId}/department/${departmentId}/group/${groupId}`
            );

            setProgramData(programResponse.data);
            setSuccessMessage("Program fetched successfully.");
        } catch (err) {
            setError("Failed to fetch group program.");
        } finally {
            setLoading(false);
        }
    };

    const handleGroupChange = (event) => {
        const groupId = event.target.value;
        setSelectedGroup(groupId);
        setProgramData(null);
        if (groupId) {
            fetchGroupProgram(groupId);
        }
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        const reorderedSubjects = Array.from(programData.subjects);
        const [movedSubject] = reorderedSubjects.splice(source.index, 1);
        reorderedSubjects.splice(destination.index, 0, movedSubject);

        setProgramData((prevState) => ({
            ...prevState,
            subjects: reorderedSubjects,
        }));
    };

    return (
        <div className="flex">
            <Aside_v2/>
            <div className="main-container">
                <Nav/>
                <div className="content-container">
                    {loading && <Loader/>}
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <div className="group-selector">
                        <label htmlFor="group-select">Select Group:</label>
                        <select
                            id="group-select"
                            value={selectedGroup}
                            onChange={handleGroupChange}
                        >
                            <option value="">-- Select a Group --</option>
                            {groups.map((group) => (
                                <option key={group._id} value={group._id}>
                                    {group.groupName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {programData && (
                        <div className="program-data">
                            <h3>Program for {selectedGroup}</h3>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="programSubjects">
                                    {(provided) => (
                                        <div
                                            className="subject-list"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {programData.subjects.map((subject, index) => {
                                                const duration = subject.subject.duration;
                                                const isDoubleDuration = duration === '3 hours';
                                                return (
                                                    <>
                                                        <Draggable
                                                            key={subject.subject.subjectName}
                                                            draggableId={`${subject.subject.subjectName}-${index}`}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    className="subject-card"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div className="subject-name">
                                                                        {subject.subject.subjectName}
                                                                    </div>
                                                                    <div className="subject-duration">
                                                                        {duration}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        {isDoubleDuration && (
                                                            <Draggable
                                                                key={`${subject.subject.subjectName}-copy-${index}`}
                                                                draggableId={`${subject.subject.subjectName}-copy-${index}`}
                                                                index={index + 1}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        className="subject-card"
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <div className="subject-name">
                                                                            {subject.subject.subjectName}
                                                                        </div>
                                                                        <div className="subject-duration">
                                                                            {duration}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )}
                                                    </>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .main-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .content-container {
                    background-color: #f4f6f9;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                }

                .group-selector {
                    margin-bottom: 20px;
                }

                .group-selector label {
                    font-size: 1em;
                    margin-right: 10px;
                }

                .group-selector select {
                    padding: 8px;
                    font-size: 0.9em;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 180px;
                }

                .program-data {
                    margin-top: 20px;
                }

                .program-data h3 {
                    font-size: 1.2em;
                    color: #333;
                    margin-bottom: 15px;
                }

                .subject-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 10px;
                    margin-top: 15px;
                }

                .subject-card {
                    background-color: #fff;
                    padding: 8px;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: move;
                    transition: transform 0.2s ease;
                    width: 100%;
                    box-sizing: border-box;
                    position: relative;
                    padding-top: 100%;
                    overflow: hidden;
                }

                .subject-card:hover {
                    transform: translateY(-3px);
                }

                .subject-name {
                    font-size: 0.8em;
                    font-weight: bold;
                    color: #333;
                    position: absolute;
                    top: 8px;
                    left: 5px;
                    right: 5px;
                    text-align: center;
                }

                .subject-duration {
                    font-size: 0.7em;
                    color: #666;
                    position: absolute;
                    bottom: 8px;
                    left: 5px;
                    right: 5px;
                    text-align: center;
                }

                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .error-message, .success-message {
                    background-color: #f8d7da;
                    color: #721c24;
                    padding: 12px;
                    margin-bottom: 15px;
                    border-radius: 5px;
                    border: 1px solid #f5c6cb;
                }

                .success-message {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
            `}</style>

        </div>
    );
};

export default EmploiMan;
