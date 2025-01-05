import React, { useState, useEffect } from 'react';
import { Avatar, Button, Modal, Form, Input, Switch, message } from 'antd';
import img from '../../assets/edit.png';
import { useSelector } from 'react-redux';
import {  Badge, Spin } from 'antd';
import { PlusOutlined,DeleteFilled,ReloadOutlined  } from '@ant-design/icons';
function Actions_teacher() {
  const sessionId = useSelector((state) => state.session.value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/admin/session/${sessionId}/teachers`);
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchTeachers();
  }, [sessionId]);

  const showUpdateModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalVisible(true);

  
    form.setFieldsValue({
      name: teacher.teacherName,
      email: teacher.email,
      cin: teacher.cin,
      isValid: teacher.isValide,
    });
  };

  const handleUpdate = async (values) => {
    if (!selectedTeacher || !selectedTeacher.id) {
      message.error('Teacher ID is missing!');
      return;
    }

    const updatedValues = {
      teacherName: values.name,
      email: values.email,
      cin: values.cin,
      isValide: values.isValid,
    };

    try {
      const response = await fetch(
        `http://localhost:8081/admin/session/${sessionId}/teacher/${selectedTeacher.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedValues),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update teacher');
      }

      message.success('Teacher updated successfully');
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === selectedTeacher.id ? { ...teacher, ...updatedValues } : teacher
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (teacherId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/admin/session/${sessionId}/teacher/${teacherId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }

      message.success('Teacher deleted successfully');
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <section className="p-6 shadow-lg border border-gray-200 rounded-lg mr-6">
      <div className="">
        <div className="bg-white dark:bg-gray-800 relativeoverflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <Input.Search placeholder="Search" />
            </div>
            <button onClick={fetchTeachers}
                    type="button"
                    className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                  >
                   < ReloadOutlined/>
                    Relode
                  </button>
          </div>
          <div className="overflow-x-auto">

            {loading?<div className=" relative flex justify-center py-10">
                  <Spin size="large" />
                </div>:
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="px-4 py-3">UID</th>
                  <th scope="col" className="px-4 py-3">CIN</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b dark:border-gray-700">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex gap-4 items-center">
                          <Avatar size={30} icon={img} />
                          <div>
                            <h2>{teacher.teacherName}</h2>
                            <p className="text-gray-400 font-normal">{teacher.email}</p>
                          </div>
                        </div>
                      </th>
                      <td className="px-4 py-3">{teacher.uid}</td>
                      <td className="px-4 py-3">{teacher.cin}</td>
                      <td className="py-5 flex items-center justify-center gap-2">
                        <Button
                          type="primary"
                          onClick={() => showUpdateModal(teacher)}
                        >
                          Update
                        </Button>
                        <Button
                          danger
                          onClick={() => handleDelete(teacher.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
              }
              </tbody>
            </table>}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <Modal
        title="Update Teacher"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]} >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]} >
            <Input />
          </Form.Item>
          <Form.Item
            label="CIN"
            name="cin"
            rules={[{ required: true, message: 'Please input the CIN!' }]} >
            <Input />
          </Form.Item>
          <Form.Item
            label="Is Valid"
            name="isValid"
            valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}

export default Actions_teacher;
