import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FolderOpenFilled ,FileFilled } from '@ant-design/icons';

function Treecomp({selected}) {
  const sessionId = useSelector((state) => state.session.value);
  const [treeData, setTreeData] = useState([
    {
      title: 'Departments',
      key: 'dep',
      icon: <FolderOpenFilled />,
      children: [], // Start with an empty array
    },
  ]);

  // Function to fetch groups for a specific department
  const loadGroups = async (departmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/admin/session/${sessionId}/departments/${departmentId}/groups`
      );
      // Map groups into the required format for the Tree component
      return (
        response.data?.map((group) => ({
          title: group.groupName,
          key: group.groupId,
          icon: <FileFilled />,
          isLeaf: true,
        })) || []
      );
    } catch (error) {
      console.error(`Error fetching groups for department ${departmentId}:`, error);
      return [];
    }
  };

  // Fetch departments and their groups
  const fetchData = async () => {
    if (!sessionId) return;

    try {
      const response = await axios.get(
        `http://localhost:8081/admin/session/${sessionId}/departments`
      );
      const departments = response.data || [];

      // Fetch groups for each department sequentially
      const updatedChildren = [];
      for (const dep of departments) {
        const groups = await loadGroups(dep.departmentId); // Fetch groups for the department
        updatedChildren.push({
          title: dep.departmentName,
          key: dep.departmentId,
          children: groups,
          icon: <FolderOpenFilled /> // Attach fetched groups as children
        });
      }

      // Update treeData once all departments are processed
      setTreeData((prevTreeData) => [
        {
          ...prevTreeData[0], // Keep the "Departments" root node
          children: updatedChildren, // Replace children with updated departments
        },
      ]);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Fetch data when the component mounts or sessionId changes
  useEffect(() => {
    fetchData();
  }, [sessionId]);

  const onSelect = (selectedKeys, info) => {
    selected(selectedKeys[0])
  };

  return (
    <div className=' p-5 border-r border-gray-200  w-64 h-full'>
      <Tree
      showIcon
      showLine
      showLeafIcon
      defaultExpandAll
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['dep']}
      onSelect={onSelect}
      treeData={treeData}
    />
    </div>
    
  );
}

export default Treecomp;
