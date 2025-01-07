import React, { useState, useEffect } from 'react';
import { Button, Input, Form, message, Spin, Select, Modal, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import {DeleteFilled,ReloadOutlined  } from '@ant-design/icons';
const GroupManagement = () => {
  const sessionId = useSelector((state) => state.session.value).trim();
  const [departments, setDepartments] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [numberGroups, setNumberGroups] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isProgramModalVisible, setIsProgramModalVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [program, setPrograms] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);

  const API_BASE_URL = 'http://localhost:8081';

  useEffect(() => {
    if (!sessionId) {
      
      message.error('Session ID is missing!');
      return;
    } 
    console.log(sessionId)
    fetchDepartments();
    fetchSubjects();
  }, [sessionId]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/session/${sessionId}/departments`);
      if (response.data && Array.isArray(response.data)) {
        setDepartments(response.data);
      } else {
        message.warning('Departments data is not in the expected format');
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      message.error('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-subjects?sessionId=${sessionId}`);
      if (response.data && Array.isArray(response.data.subjects)) {
        setSubjects(response.data.subjects);
      } else {
        message.warning('Subjects data is not in the expected format');
      }
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      message.error('Failed to fetch subjects');
    }
  };

  const fetchGroupId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-group-id`, {
        params: {
          groupName,
          sessionId,
          departmentId: selectedDepartment,
        },
      });
      if (response.data && response.data.groupId) {
        setGroupId(response.data.groupId);
        setDepartmentId(selectedDepartment);
        setIsProgramModalVisible(true);
      } else {
        message.error('Failed to fetch group ID');
      }
    } catch (error) {
      console.error('Failed to fetch group ID:', error);
      message.error('Failed to fetch group ID');
    }
  };

  const handleAddGroup = async () => {
    if (!selectedDepartment || !groupName || numberGroups <= 0) {
      message.error('Please fill in all required fields');
      return;
    }

    const groupData = {
      groupName,
      numberGroups,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/session/${sessionId}/departments/${selectedDepartment}/groups`,
        groupData
      );
      if (response.status === 200) {
        message.success('Group added successfully');
        await fetchGroupId();
      } else {
        message.error('Failed to add group');
      }
    } catch (error) {
      console.error('Failed to add group:', error);
      message.error('Failed to add group');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProgram = async () => {
    if (!departmentId || !groupId) {
      message.error('Department ID or Group ID is missing');
      return;
    }

    const validPrograms = program.map((program) => {
      const validSubjects = program.selectedSubjects.map((subjectId) => {
        const subject = subjects.find((s) => s._id === subjectId);
        if (subject) {
          return {

            "subject": {
              "subjectName": subject.subjectName,
              "duration":subject.duration
            }, 
            
            recurrence: program.recurrence,
          };
        }
        return null;
      }).filter(Boolean);

      return {
        programName: program.programName,
        subjects: validSubjects,
        recurrence: program.recurrence,
      };
    }).filter((program) => program.subjects.length > 0);

    if (validPrograms.length === 0) {
      message.error('Please add at least one valid program with subjects');
      return;
    }

    const requestData = { programs: validPrograms };

    try {
      console.log(requestData.programs[0])
      const response = await axios.post(
        `${API_BASE_URL}/admin/session/${sessionId}/department/${departmentId}/group/${groupId}`,
        requestData.programs[0]
      );
      if (response.data) {
        console.log(response.data)
        message.success('Programs added successfully');
        setPrograms([{ programName: '', selectedSubjects: [], recurrence: 0 }]);
        setIsProgramModalVisible(false);
      } else {
        message.error('Failed to add programs');
      }
    } catch (error) {
      console.error('Error occurred while adding programs:', error);
      message.error('Failed to add programs');
    }
  };

  const handleAddProgramSection = () => {
    setPrograms([
      ...program,
      { programName: '', selectedSubjects: [], recurrence: 0 },
    ]);
  };

  const handleRemoveProgramSection = (index) => {
    setPrograms(program.filter((_, i) => i !== index));
  };

  return (
    <div className='' style={{  padding: '20px', backgroundColor: '#fff'}}>
      <div className=" p-5 flex justify-between">  <h2>Add New Group</h2>
      <button  onClick={()=>{fetchDepartments();
    fetchSubjects();}}
                    type="button"
                    className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                  >
                   < ReloadOutlined/>
                    Relode
                  </button></div>
    
      <div className="flex justify-center align-middle">
      {loading ? (
        <div className="relative flex justify-center py-10">
                <Spin size="large" />
              </div>
      ) : (
        <div className="w-3/4 p-10">
        <Form layout="vertical" onFinish={handleAddGroup}>
          <Form.Item label="Select Department" required>
            <Select
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              placeholder="Select Department"
              disabled={departments.length === 0}
            >
              {departments.map((dept) => (
                <Select.Option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Group Name" required>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Group Name"
            />
          </Form.Item>

          <Form.Item label="Number of Groups" required>
            <Input
              type="number"
              value={numberGroups}
              onChange={(e) => setNumberGroups(Number(e.target.value))}
              placeholder="Enter Number of Groups"
            />
          </Form.Item>

          <Form.Item>
            <Button className='w-full' type="primary" htmlType="submit">
              Add Group
            </Button>
          </Form.Item>
        </Form></div>
      )}

      <Modal
        title="Add Programs and Assign Students"
        visible={isProgramModalVisible}
        onOk={handleAddProgram}
        onCancel={() => setIsProgramModalVisible(false)}
        okText="Add Programs"
      >
        {program.map((program, index) => (
          <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <Form.Item label={`Program Name ${index + 1}`} required>
              <Input
                value={program.programName}
                onChange={(e) =>
                  setPrograms((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, programName: e.target.value } : p
                    )
                  )
                }
                placeholder="Enter Program Name"
              />
            </Form.Item>

            <Form.Item label="Subjects" required>
              <Checkbox.Group
                options={subjects.map((subject) => ({
                  label: `${subject.subjectName} (${subject.duration}, ${subject.type})`,
                  value: subject._id,
                }))}
                value={program.selectedSubjects}
                onChange={(selectedSubjects) => {
                  setPrograms((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, selectedSubjects } : p
                    )
                  );
                }}
              />
            </Form.Item>

            <Form.Item label="Recurrence" required>
              <Input
                type="number"
                value={program.recurrence}
                onChange={(e) =>
                  setPrograms((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, recurrence: Number(e.target.value) } : p
                    )
                  )
                }
                placeholder="Enter Recurrence"
              />
            </Form.Item>

            <Button
              type="danger"
              onClick={() => handleRemoveProgramSection(index)}
            >
              Remove Program
            </Button>
          </div>
        ))}
        <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddProgramSection}>
          Add Program Section
        </Button>
      </Modal>
    </div></div>
  );
};

export default GroupManagement;
