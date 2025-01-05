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
      !teacherData.cin ||
      !teacherData.subjectsCanTeach.length ||
      !teacherData.timeSlots.length
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
          cin: '',
          subjectsCanTeach: [],
          timeSlots: [{ day: '', startTime: '', endTime: '' }],
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

  const handleSubjectChange = (checked, subject) => {
    const updatedSubjects = checked
      ? [...teacherData.subjectsCanTeach, { subjectName: subject.subjectName, duration: subject.duration }]
      : teacherData.subjectsCanTeach.filter((item) => item.subjectName !== subject.subjectName);

    setTeacherData({ ...teacherData, subjectsCanTeach: updatedSubjects });
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...teacherData.timeSlots];
    updatedTimeSlots[index][field] = value;
    setTeacherData({ ...teacherData, timeSlots: updatedTimeSlots });
  };

  const handleAddTimeSlot = () => {
    setTeacherData({
      ...teacherData,
      timeSlots: [...teacherData.timeSlots, { day: '', startTime: '', endTime: '' }],
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

      <div className="w-full flex flex-col justify-center items-center max-w-4xl mx-auto min-h-96 mt-8">
        <h2 className="text-xl font-semibold mb-4">Add Teacher Manually</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={teacherData.name}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={teacherData.email}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cin"
            value={teacherData.cin}
            placeholder="CIN"
            className="p-2 border border-gray-300 rounded"
            onChange={handleInputChange}
          />


          <div className="mt-4">
            <h3 className="text-lg">Subjects Can Teach</h3>
            <div>
              {subjects.map((subject) => (
                <Checkbox
                  key={subject.id}
                  onChange={(e) => handleSubjectChange(e.target.checked, subject)}
                >
                  {subject.subjectName} ({subject.duration})
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg">Time Slots</h3>
            {teacherData.timeSlots.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Day"
                  value={slot.day}
                  onChange={(e) => handleTimeSlotChange(index, 'day', e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  placeholder="Start Time"
                  value={slot.startTime}
                  onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  placeholder="End Time"
                  value={slot.endTime}
                  onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
            <button onClick={handleAddTimeSlot} className="text-blue-500">Add Another Time Slot</button>
          </div>

          <Button
            type="primary"
            onClick={handleAddTeacherManually}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Add Teacher Manually'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Manage_Teacher;
