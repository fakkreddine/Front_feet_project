import React, { useState, useEffect } from 'react';
import { Button, Input, Form, message, Checkbox, Spin, Modal, Select, Upload } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const GroupManagement = () => {
  const sessionId = useSelector((state) => state.session.value);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [studentsFile, setStudentsFile] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProgramModalVisible, setIsProgramModalVisible] = useState(false);
  const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramSubjects, setNewProgramSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectType, setNewSubjectType] = useState([]);  
  const [newSubjectDuration, setNewSubjectDuration] = useState('');

  const API_BASE_URL = 'http://localhost:8081';

  useEffect(() => {
    if (!sessionId) {
      message.error('Session ID is missing!');
      return;
    }
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
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/session/${sessionId}/subjects`);
      if (response.data && Array.isArray(response.data)) {
        setSubjects(response.data);
      } else {
        message.warning('Subjects data is not in the expected format');
      }
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      message.error('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProgram = async () => {
    if (subjects.length === 0) {
      message.warning('Please wait for subjects to load before adding a program.');
      return;
    }
    setIsProgramModalVisible(true); 
  };

  const handleAddSubject = () => {
    setIsSubjectModalVisible(true); 
  };

  const handleProgramModalOk = () => {
    if (!newProgramName || newProgramSubjects.length === 0) {
      message.error('Please provide a program name and select at least one subject');
      return;
    }

    const newProgram = {
      programName: newProgramName,
      selectedSubjects: newProgramSubjects,
    };

    setPrograms([...programs, newProgram]);  
    setIsProgramModalVisible(false);  
    setNewProgramName('');  
    setNewProgramSubjects([]);  
  };

  const handleSubjectModalOk = async () => {
    if (!newSubjectName || newSubjectType.length === 0 || !newSubjectDuration) {
      message.error('Please provide a subject name, select a subject type, and specify the duration');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/session/${sessionId}/subject`,
        {
          subjectName: newSubjectName,
          type: newSubjectType.join(', '),
          duration: newSubjectDuration,
        }
      );
      if (response.data) {
        setSubjects([...subjects, response.data]);
        message.success('Subject added successfully');
        setIsSubjectModalVisible(false);
        setNewSubjectName('');
        setNewSubjectType([]);
        setNewSubjectDuration('');
      } else {
        message.error('Failed to add subject');
      }
    } catch (error) {
      console.error('Failed to add subject:', error);
      message.error('Failed to add subject');
    }
  };

  const handleModalCancel = () => {
    setIsProgramModalVisible(false);
    setIsSubjectModalVisible(false);
  };

  const handleProgramNameChange = (e) => {
    setNewProgramName(e.target.value);
  };

  const handleSubjectsChange = (checkedValues) => {
    setNewProgramSubjects(checkedValues);
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setStudentsFile(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleAddGroup = async () => {
    if (!selectedDepartment || !groupName || !studentsFile || programs.length === 0) {
      message.error('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('groupName', groupName);
    formData.append('departmentId', selectedDepartment);
    formData.append('studentsFile', studentsFile);
    formData.append('programs', JSON.stringify(programs));

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/session/${sessionId}/departments/${selectedDepartment}/groups`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data) {
        message.success('Group added successfully');
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

  return (
    <div
      style={{
        marginLeft: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '100vh',
      }}
    >
      <h2>Add New Group</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
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

          <Form.Item label="Upload Students File" required>
            <Upload
              name="studentsFile"
              showUploadList={false}
              onChange={handleFileChange}
              beforeUpload={() => false} // Disable auto-upload
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <h3>Programs</h3>
          {programs.length > 0 ? (
            programs.map((program, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '20px',
                  padding: '10px',
                  border: '1px solid #ddd',
                }}
              >
                <Form.Item label="Program Name" required>
                  <Input
                    value={program.programName || ''} 
                    disabled
                    placeholder="Program Name"
                  />
                </Form.Item>
                <Form.Item label="Subjects" required>
                  <Checkbox.Group
                    options={subjects.map((subject) => ({
                      label: subject.subjectName,
                      value: subject.subjectId,  
                    }))} 
                    value={program.selectedSubjects || []} 
                    disabled
                  />
                </Form.Item>
              </div>
            ))
          ) : (
            <p>No programs added yet.</p>
          )}
          <Button type="dashed" onClick={handleAddProgram} style={{ marginTop: '20px' }}>
            Add Program
          </Button>

          <h3>Subjects</h3>
          <Button type="dashed" onClick={handleAddSubject} style={{ marginTop: '20px' }}>
            Add Subject
          </Button>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Group
            </Button>
          </Form.Item>
        </Form>
      )}
      <Modal
        title="Add New Program"
        visible={isProgramModalVisible}
        onOk={handleProgramModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Program Name">
            <Input value={newProgramName} onChange={handleProgramNameChange} />
          </Form.Item>
          <Form.Item label="Select Subjects">
            <Checkbox.Group
              options={subjects.map((subject) => ({
                label: subject.subjectName,
                value: subject.subjectId,
              }))}
              value={newProgramSubjects}
              onChange={handleSubjectsChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add New Subject"
        visible={isSubjectModalVisible}
        onOk={handleSubjectModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Subject Name">
            <Input
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
            />
          </Form.Item>
          <Form.Item label="Subject Type">
            <Checkbox.Group
              options={[
                { label: 'Lab', value: 'Lab' },
                { label: 'Course', value: 'Course' },
              ]}
              value={newSubjectType}
              onChange={(checkedValues) => setNewSubjectType(checkedValues)}
            />
          </Form.Item>
          <Form.Item label="Subject Duration">
            <Input
              value={newSubjectDuration}
              onChange={(e) => setNewSubjectDuration(e.target.value)}
              placeholder="Enter Duration"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupManagement;
