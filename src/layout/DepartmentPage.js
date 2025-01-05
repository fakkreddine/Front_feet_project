  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Aside from "../component/Aside";
  import Nav from "../component/Nav";
  import { useSelector, useDispatch } from 'react-redux'
  import Aside_v2 from "../component/Aside_v2";
  import { Link } from "react-router-dom";
  import { PlusOutlined,ReloadOutlined  } from '@ant-design/icons';
  import {  Spin } from 'antd'; // Import Spin for loading indicator
  const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const [loding, setloding] = useState(false);
    const [newDepartment, setNewDepartment] = useState({
      departmentName: "",
    });
    const [editedDepartment, setEditedDepartment] = useState({
      departmentId: "",
      departmentName: "",
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [departmentToDelete, setDepartmentToDelete] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const sessionId = useSelector((state) => state.session.value  )
    const API_BASE_URL = "http://localhost:8081";


    useEffect(() => {
     
      fetchDepartments(sessionId);
      
    }, []);

    const fetchDepartments = async (sessionId) => {
      setloding(true)
      try {
        const response = await axios.get(
          `${API_BASE_URL}/admin/session/${sessionId}/departments`
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Failed to load departments");
      }
      setloding(false)  
    };

    const handleAddDepartment = async () => {
      if (!newDepartment.departmentName ) {
        setError("Enter Department name");
        return;
      }

      try {
        await axios.post(
          `${API_BASE_URL}/admin/session/${sessionId}/department`,
          newDepartment
        );
        fetchDepartments(sessionId);
        closeModal();
      } catch (err) {
        console.error("Error adding department:", err);
        setError("Failed to add department");
      }
      
    };

    const handleEditDepartment = (department) => {
      setIsEditing(true);
      setEditedDepartment({
        departmentId: department.departmentId,
        departmentName: department.departmentName,
        description: department.description,
      });
      setModalOpen(true);
    };

    const handleUpdateDepartment = async () => {
      if (!editedDepartment.departmentName || !editedDepartment.description) {
        setError("Both fields are required!");
        return;
      }

      try {
        await axios.put(
          `${API_BASE_URL}/admin/session/${sessionId}/department/${editedDepartment.departmentId}`,
          {
            departmentName: editedDepartment.departmentName,
            description: editedDepartment.description,
          }
        );
        fetchDepartments(sessionId);
        closeModal();
      } catch (err) {
        console.error("Error updating department:", err);
        setError("Failed to update department");
      }
    };

    const openDeleteModal = (department) => {
      setDepartmentToDelete(department);
      setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
      setDeleteModalOpen(false);
      setDepartmentToDelete(null);
    };

    const handleDeleteDepartment = async () => {
      if (departmentToDelete) {
        try {
          await axios.delete(
            `${API_BASE_URL}/admin/session/${sessionId}/department/${departmentToDelete.departmentId}`
          );
          fetchDepartments(sessionId);
          closeDeleteModal();
        } catch (err) {
          console.error("Error deleting department:", err);
          setError("Failed to delete department");
        }
      }
    };

    const openModal = () => {
      setIsEditing(false);
      setNewDepartment({ departmentName: ""});
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
      setError(null);
    };

    // Filter departments based on search term
    const filteredDepartments = departments.filter((department) =>
      department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    // Pagination Logic
    const indexOfLastDepartment = currentPage * itemsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - itemsPerPage;
    const currentDepartments = filteredDepartments.slice(
      indexOfFirstDepartment,
      indexOfLastDepartment
    );

    const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div className="flex min-h-screen bg-white">
        <Nav />
        <Aside_v2  />

        <div className="mt-15 pt-20 ml-24 pl-5 transition-all duration-300 peer-hover:ml-64 h-screen w-full ">
        
          <nav className=" p-4 flex w-auto" aria-label="Breadcrumb">
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
                                  Departments
                                  </span>
                                </div>
                              </li>
                            </ol>
                          </nav>
          <div className=" p-6 rounded-md shadow-md border-gray-200 w-full h-4/5 mx-auto border  ">

          <form className="flex items-center max-w-lg mx-auto mb-4">
    <label htmlFor="voice-search" className="sr-only">Search</label>
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
        </svg>
      </div>
      <input
        type="text"
        id="voice-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Departments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </button>
    </div>
    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>Search
    </button>
  </form>

            <div className="flex justify-end mb-4 gap-8">
            <button onClick={()=>{fetchDepartments(sessionId)}}
                      type="button"
                      className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                    >
                    < ReloadOutlined/>
                      Relode
                    </button>
              <button
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300"
              >
                + Add New Department
              </button>
            </div>
            <div className="relative overflow-x-auto  p-6">

              {loding? <div className="flex justify-center items-center h-full  ">
                            <Spin size="large" />
                          </div>:
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-3">Department Name</th>
                    <th scope="col" className="px-4 py-3">Groups</th>
                    <th scope="col" className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((department, index) => (
                    <tr key={department.departmentId} className="border-b bg-white hover:bg-gray-100 transition duration-200 ease-in-out">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{department.departmentName}</td>
                      <td className="px-4 py-2">
                        {department.groups && department.groups.length > 0 ? (
                          <ul className="overflow-hidden">
                            {department.groups.map((group) => (
                             <span key={group.groupId} id="badge-dismiss-default" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300">
                              {group.groupName}
                              
                              </span>
                              
                            ))}
                          </ul>
                        ) : (
                          "No groups"
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 text-sm"
                          onClick={() => handleEditDepartment(department)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => openDeleteModal(department)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>}
            </div>
            
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
                {Array.from({ length: totalPages }, (_, index) => (
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
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
        </div>
        {modalOpen && (
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-75 backdrop-blur-lg"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-hidden">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isEditing ? "Edit Department" : "Create New Department"}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5 space-y-4">
                  <div>
                    <label
                      htmlFor="departmentName"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department Name
                    </label>
                    <input
                      type="text"
                      id="departmentName"
                      className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter department name"
                      value={isEditing ? editedDepartment.departmentName : newDepartment.departmentName}
                      onChange={(e) =>
                        isEditing
                          ? setEditedDepartment({
                              ...editedDepartment,
                              departmentName: e.target.value,
                            })
                          : setNewDepartment({
                              ...newDepartment,
                              departmentName: e.target.value,
                            })
                      }
                    />
                  </div>

              

                  {error && (
                    <div className="text-red-500 text-sm">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm"
                      onClick={isEditing ? handleUpdateDepartment : handleAddDepartment}
                    >
                      {isEditing ? "Update" : "Add"} Department
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {deleteModalOpen && (
          <div
            id="delete-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-75 backdrop-blur-lg"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-hidden">
                <div className="p-4 md:p-5 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Are you sure you want to delete this department?
                  </h3>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={closeDeleteModal}
                      className="bg-gray-400 text-white px-6 py-2 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteDepartment}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default DepartmentPage;
