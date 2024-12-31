import React, { useState, useEffect } from 'react';
import { Button, message, Spin, Select, Input, Form } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManageGroup = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [studentList, setStudentList] = useState([]);

  const API_BASE_URL = 'http://localhost:8081';

  useEffect(() => {
    fetchGroupDetails();
    fetchPrograms();
    fetchStudents();
  }, [groupId]);

  const fetchGroupDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/groups/${groupId}`);
      if (response.data) {
        setGroupDetails(response.data);
      } else {
        message.warning('Failed to fetch group details');
      }
    } catch (error) {
      console.error('Failed to fetch group details:', error);
      message.error('Failed to fetch group details');
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/programs`);
      if (response.data && Array.isArray(response.data)) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      message.error('Failed to fetch programs');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/groups/${groupId}/students`);
      if (response.data && Array.isArray(response.data)) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      message.error('Failed to fetch students');
    }
  };

  const handleAssignProgram = async () => {
    if (!selectedProgram) {
      message.error('Please select a program to assign');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/groups/${groupId}/assign-program`, {
        programId: selectedProgram,
      });

      if (response.data) {
        message.success('Program assigned successfully');
        fetchGroupDetails(); // Refresh group details
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error('Conflict: The program is already assigned or invalid request.');
      } else {
        console.error('Failed to assign program:', error);
        message.error('Failed to assign program');
      }
    }
  };

  const handleUpdateStudentList = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/groups/${groupId}/update-students`, {
        students: studentList,
      });

      if (response.data) {
        message.success('Student list updated successfully');
        fetchStudents(); // Refresh student list
      }
    } catch (error) {
      console.error('Failed to update student list:', error);
      message.error('Failed to update student list');
    }
  };

  return (
    <div
      style={{
        marginLeft: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '100vh',
      }}
    >
      <h2>Manage Group</h2>
      {loading ? (
        <Spin size="large" />
      ) : groupDetails ? (
        <div>
          <h3>Group Name: {groupDetails.groupName}</h3>
          <h4>Department: {groupDetails.departmentName}</h4>

          <Form layout="vertical">
            <Form.Item label="Assign Program">
              <Select
                value={selectedProgram}
                onChange={setSelectedProgram}
                placeholder="Select Program"
              >
                {programs.map((program) => (
                  <Select.Option key={program.programId} value={program.programId}>
                    {program.programName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button type="primary" onClick={handleAssignProgram}>
              Assign Program
            </Button>
          </Form>

          <h3>Student List</h3>
          <Input.TextArea
            rows={6}
            value={studentList.join('\n')}
            onChange={(e) => setStudentList(e.target.value.split('\n'))}
            placeholder="Enter student IDs, one per line"
          />

          <Button type="primary" onClick={handleUpdateStudentList} style={{ marginTop: '10px' }}>
            Update Student List
          </Button>
        </div>
      ) : (
        <p>Failed to load group details</p>
      )}
    </div>
  );
};

export default ManageGroup;
