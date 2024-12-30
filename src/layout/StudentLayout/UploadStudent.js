import React, { useState } from 'react';
import { FileUpload } from '../../component/dashcomp/FileUploadDemo';
import axios from 'axios';
import { Spin, message } from 'antd'; // Importing Spin and message from Ant Design
import { MultiStepLoader as Loader } from '../../component/dashcomp/multi-step-loader.tsx';

function UploadStudent({ data }) {
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const loadingStates = [
    {
      text: "Buying a condo",
    },
    {
      text: "Travelling in a flight",
    },
    
  ];
    // For loading spinner

  // Handle file selection
  const handleFileUpload = (files) => {
    setFiles(files);
  };

  const formData = new FormData();
  formData.append('file', files[0]);

  const uploadFile = async () => {
    setLoading(true); // Show the loading spinner
    setUpload(true);

    try {
      const { data: response = [] } = await axios.post(
        `http://localhost:8081/admin/session/${data?.sessionId}/departments/${data?.department}/groups/${data.group}/students/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers
          },
        }
      );

      // If upload is successful, show success message
      message.success('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      message.error('File upload failed!');
    } finally {
      setLoading(false); // Hide the loading spinner after the request
    }
  };

  return (
    <div className="upload-container">
      {upload ? (
         <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
        
 
      ) : (
        <div className="w-full flex flex-col justify-center items-center max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <FileUpload onChange={handleFileUpload} />
          {files.length !== 0 && (
            <button
              type="button"
              onClick={uploadFile}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Submit Files
            </button>
          )}
        </div>
      )}

      {/* Show loading spinner if uploading */}
      {loading && (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default UploadStudent;
