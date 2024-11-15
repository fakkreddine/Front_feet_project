import React, { useState } from 'react';
import Aside from "../component/Aside";
import Nav from "../component/Nav";

function SchedulePage() {
  const [loadingTimetable, setLoadingTimetable] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [files, setFiles] = useState({
    roomsFile: null,
    professorsFile: null,
    subjectsFile: null,
    classesFile: null,
    classSubjectsFile: null
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const flaskBaseURL = process.env.REACT_APP_FLASK_BASE_URL || "http://localhost:5000";
  const staticSessionId = '672a4903041299154d5f4da6';

  const apiCall = async (endpoint, method = 'GET', body = null, isFile = false) => {
    try {
      const options = {
        method,
        headers: { 'Content-Type': isFile ? 'multipart/form-data' : 'application/json' },
      };

      if (body) {
        if (isFile) {
          const formData = new FormData();
          formData.append('file', body);
          options.body = formData;
        } else {
          options.body = JSON.stringify(body);
        }
      }

      const response = await fetch(`${flaskBaseURL}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleFileUpload = (event, fileType) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    if (file && !file.name.endsWith('.csv')) {
      setError('Only CSV files are allowed.');
      return;
    }

    setFiles(prevFiles => ({
      ...prevFiles,
      [fileType]: file
    }));
  };


  const handleGenerateTimetable = async () => {
    setLoadingTimetable(true);
    setError(null);
    setSuccessMessage('');

    const requiredFiles = Object.values(files);
    if (requiredFiles.some(file => !file)) {
      setError('Please upload all required files first.');
      setLoadingTimetable(false);
      return;
    }

    try {
      const data = await apiCall(`/generate_timetable/${staticSessionId}`, 'POST', files.classSubjectsFile, true);
      setSuccessMessage(data.message);
      setIsModalVisible(true); 
    } catch (err) {
      setError(err.message);
      setIsModalVisible(true); 
    } finally {
      setLoadingTimetable(false);
    }
  };


  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Aside className="w-64 bg-gray-800 text-white" />
      
      <div className="flex-1 ml-64 p-6">
        <Nav />
        <br/><br/><br/><br/>
        <h1 className="text-2xl mb-4">Schedule for Session</h1>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">File</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Room</th>
                <td className="px-6 py-4">
                  <input 
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'roomsFile')}
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Professor</th>
                <td className="px-6 py-4">
                  <input 
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'professorsFile')}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Subject</th>
                <td className="px-6 py-4">
                  <input 
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'subjectsFile')}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Class</th>
                <td className="px-6 py-4">
                  <input 
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'classesFile')}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Class Subject</th>
                <td className="px-6 py-4">
                  <input 
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'classSubjectsFile')}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 md:p-5 space-y-4">
       
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
        </div>

        <br/><br/>

        <button
          onClick={handleGenerateTimetable}
          disabled={loadingTimetable}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loadingTimetable ? 'Generating...' : 'Generate Timetable'}
        </button>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-medium text-gray-900">{error ? 'Error' : 'Success'}</h3>
            <p className="mt-2 text-gray-500">{error || successMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SchedulePage;
