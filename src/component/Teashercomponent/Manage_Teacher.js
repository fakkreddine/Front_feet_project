import React, { useState, useEffect } from 'react';
import { Button, message, Checkbox } from 'antd';
import { FileUpload } from '../dashcomp/FileUploadDemo';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Manage_Teacher() {
  const sessionId = useSelector((state) => state.session.value);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: '',
    email: '',
    cin: '',
    subjectsCanTeach: [],
    timeSlots: [{ day: '', startTime: '', endTime: '' }],
  });
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8081/admin/session/${sessionId}/subjects`
        );
        if (response.status === 200) {
          setSubjects(response.data);
        }
      } catch (error) {
        message.error('Failed to fetch subjects');
      }
    };

    if (sessionId) {
      fetchSubjects();
    }
  }, [sessionId]);

  const handleFileUpload = (fileList) => {
    setFiles(fileList);
  };

  const handleSubmitFile = async () => {
    if (files.length === 0) {
      message.warning("Please upload a file first.");
      return;
    }

    const file = files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
          `http://localhost:8081/admin/session/${sessionId}/teachers/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
      );

      if (response.status === 200) {
        message.success("Teachers uploaded successfully");
        setFiles([]); // Clear files after successful upload
        setUploading(false);
      }
    } catch (error) {
      setUploading(false);
      message.error("Failed to upload teachers from file");
    }
  };

  const handleAddTeacherManually = async () => {
    if (
        !teacherData.name ||
        !teacherData.email ||
        !teacherData.cin
    ) {
      message.warning('Please fill all fields.');
      return;
    }

    setUploading(true);

    console.log('Teacher Data:', teacherData);

    try {
      const response = await axios.post(
          `http://localhost:8081/admin/session/${sessionId}/teachers`,
          teacherData
      );
      if (response.status === 200) {
        message.success('Teacher added successfully');
        setTeacherData({
          name: '',
          email: '',
          cin: ''
        });
        setUploading(false);
      }
    } catch (error) {
      setUploading(false);
      if (error.response) {
        console.error('Response error:', error.response.data);
        message.error(`Failed to add teacher: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Request error:', error.request);
        message.error('Failed to add teacher: No response from server');
      } else {
        console.error('Error:', error.message);
        message.error(`Failed to add teacher: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  return (
      <div className=''>
        {uploading ? (
            <h1>Uploading...</h1>
        ) : (
            <div className=" flex flex-col justify-center items-center max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload onChange={handleFileUpload} />
              {files.length !== 0 && (
                  <button
                      type="button"
                      onClick={handleSubmitFile}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Submit Files
                  </button>
              )}
            </div>
        )}

        <div className="w-full flex flex-col justify-center items-center max-w-4xl mx-auto min-h-96 mt-8 bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Add Teacher Manually</h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-lg text-gray-700">Teacher Name</label>
              <input
                  type="text"
                  name="name"
                  value={teacherData.name}
                  placeholder="Enter Teacher's Name"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg text-gray-700">Email</label>
              <input
                  type="email"
                  name="email"
                  value={teacherData.email}
                  placeholder="Enter Teacher's Email"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cin" className="text-lg text-gray-700">CIN</label>
              <input
                  type="text"
                  name="cin"
                  value={teacherData.cin}
                  placeholder="Enter Teacher's CIN"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <Button
                  type="primary"
                  onClick={handleAddTeacherManually}
                  disabled={uploading}
                  className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none"
              >
                {uploading ? 'Uploading...' : 'Add Teacher Manually'}
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Manage_Teacher;
