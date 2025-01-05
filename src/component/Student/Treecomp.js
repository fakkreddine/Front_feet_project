import React, { useEffect, useState, useCallback, memo } from 'react';
import { Tree } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DownOutlined, FolderOpenFilled, FileFilled } from '@ant-design/icons';
import { PlusOutlined,DeleteFilled,ReloadOutlined  } from '@ant-design/icons';
import { Empty, Spin } from 'antd'; // Import Spin for loading indicator
const { TreeNode } = Tree;

const TreeComp = memo(({ selected ,relode}) => {
  const sessionId = useSelector((state) => state.session.value);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!sessionId) return;

    try {
      // Fetch departments
      const { data: departmentsData = [] } = await axios.get(
        `http://localhost:8081/admin/session/${sessionId}/departments`
      );

      // Fetch all groups in parallel
      const departmentsWithGroups = await Promise.all(
        departmentsData.map(async (dep) => {
          try {
            const { data: groups = [] } = await axios.get(
              `http://localhost:8081/admin/session/${sessionId}/departments/${dep.departmentId}/groups`
            );

            return {
              ...dep,
              groups: groups.map(group => ({
                ...group,
                key: {
                  id: group.groupId,
                  department: dep.departmentId,
                  departemnt_name: dep.departmentName,
                  name: group.groupName
                },
                isLeaf: true, // Mark groups as leaf nodes
                data: {
                  id: group.groupId,
                  department: dep.departmentId,
                  departemnt_name: dep.departmentName,
                  name: group.groupName,
                  isLeaf: true, // Adding isLeaf to the data object
                }
              }))
            };
          } catch (error) {
            console.error(`Error fetching groups for department ${dep.departmentId}:`, error);
            return { ...dep, groups: [], isLeaf: true }; // Mark department as leaf if no groups
          }
        })
      );

      setDepartments(departmentsWithGroups);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  }, [sessionId,relode]);

  useEffect(() => {
    fetchData();
    console.log(relode,'tree  ')
   
  }, [fetchData,relode]);


  // Memoized render function for departments
  const renderDepartments = useCallback(() => {
    return departments.map((department) => (
      <TreeNode
        title={department.departmentName}
        key={department.departmentId}
        icon={<FolderOpenFilled className="text-blue-600 text-xl" />}
        isLeaf={department.groups.length === 0} // Mark department as leaf if no groups
        data={{
          id: department.departmentId,
          departemnt_name: department.departmentName,
          isLeaf: department.groups.length === 0, // Adding isLeaf to the department data
        }}
        className="font-semibold mb-2 py-2 px-4 text-gray-800"
      >
        {department.groups.map((group) => (
          <TreeNode
            title={group.groupName}
            key={group.groupId}
            icon={<FileFilled className="text-green-600 text-lg" />}
            isLeaf
            data={group.data} // Pass the group data with isLeaf
            className="font-normal mb-2 py-2 px-4 text-gray-600"
          />
        ))}
      </TreeNode>
    ));
  }, [departments]);

  

  const onSelect = (selectedKeys, info) => {
    if (info.node) {
      // Pass the relevant data from info.node to the selected callback
      const selectedNodeData = {
        key: info.node.key,
        title: info.node.title,
        icon: info.node.icon,
        data: info.node.data,
      };
      selected(selectedNodeData); // Call selected with structured data
    }
  };

  return (
    <div className="  px-1 border-gray-200 p-5 border-r border-gray-200 w-64 h-full bg-white">
      {loading?<div className="relative flex justify-center py-10">
        <Spin size="large" />
      </div>:
      <Tree
        showIcon
        showLine
        showLeafIcon
        defaultExpandAll
        switcherIcon={<DownOutlined className="text-blue-600 text-lg" />}
        onSelect={onSelect}
        className="custom-tree" // Add custom styling for lines
      >
        <TreeNode title="Departments" key="dep" icon={<FolderOpenFilled className="text-blue-600 text-xl" />}>
          {renderDepartments()}
        </TreeNode>
      </Tree>}
    </div>
  );
});

TreeComp.displayName = 'TreeComp';

export default TreeComp;
