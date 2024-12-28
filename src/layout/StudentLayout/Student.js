import React, { useEffect, useState } from 'react';
import UserHome from '../UserHome';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Tree from '../../component/Student/Treecomp';
import Aside_v2 from '../../component/Aside_v2';
import { Button, Result, Spin } from 'antd';
import { Breadcrumb, Empty} from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Studentoverview from './Studentoverview';

function Student() {
  let [selected, setSelected] = useState(null);
  let [info, setinfo] = useState(null);
  let [relode, setrolode] = useState(false);
  let [loading, setLoading] = useState(false);
  const [department,setDepartmetn] = useState() // State for the loader
  const sessionId = useSelector((state) => state.session.value);

  const relodetable=()=>{
    setrolode(prev => !prev)
    console.log(relode)
  }
  let changeSelection = async (info) => {
    setinfo(info)
    
    if (info.data?.isLeaf) {
      setLoading(true); // Start the loader
      try {
        const response = await axios.get(
          `http://localhost:8081/admin/session/${sessionId}/departments/${info.data.department}/groups/${info.data.id}`
        );
        setSelected(response.data);
        setDepartmetn(info.data.department)
      
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false); // Stop the loader
      }
    }
  };
  useEffect(()=>{
    
    info&&changeSelection(info)
  },[relode])

  return (
    <div className="h-screen w-screen">
      <Aside_v2 />
      <div className="mt-15 pt-14 ml-24 transition-all duration-300 peer-hover:ml-64 flex h-screen">
        <Tree relode={relode} selected={changeSelection} />
        <div className="w-full">
          {loading ? ( // Display loader if loading is true
            <div className="flex justify-center items-center h-full ">
              <Spin size="large" />
            </div>
          ) : selected ? (
            <div className='flex flex-col  p-6'>
             

         {info.data?.isLeaf&&( <Breadcrumb>
    <Breadcrumb.Item><HomeOutlined /> <span>Departments</span></Breadcrumb.Item>
    <Breadcrumb.Item>{info.data.departemnt_name}</Breadcrumb.Item>
      <Breadcrumb.Item>{info.data.name}</Breadcrumb.Item>
  </Breadcrumb>)}
            <Studentoverview relode={relodetable} department={department} data={selected}/>
            </div>
          ) : (
            <div className='flex justify-center items-center h-full'>  <Empty className=''  /></div>
          
          )}
        </div>
      </div>
    </div>
  );
}

export default Student;
