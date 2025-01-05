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
import { Link } from 'react-router-dom';

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
    <div className="">
      <Aside_v2 />
      
      <div className="mt-20 ml-24 transition-all duration-300 peer-hover:ml-64  h-screen">

      <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to="/home"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    students
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
 <div className="flex w-full h-full gap-7">

        <Tree className="" relode={relode} selected={changeSelection} />
        <div className="w-full">
          {loading ? ( // Display loader if loading is true
            <div className="flex justify-center items-center h-full ">
              <Spin size="large" />
            </div>
          ) : selected ? (
            <div className='flex flex-col  p-6 shadow-lg border border-lg rounded-lg px-6 border-gray-200 '>
             

         {info.data?.isLeaf&&( <Breadcrumb>
    <Breadcrumb.Item><HomeOutlined /> <span>Departments</span></Breadcrumb.Item>
    <Breadcrumb.Item>{info.data.departemnt_name}</Breadcrumb.Item>
      <Breadcrumb.Item>{info.data.name}</Breadcrumb.Item>
  </Breadcrumb>)}
            <Studentoverview leaf={info.data?.isLeaf} relode={relodetable} department={department} data={selected}/>
            </div>
          ) : (
            <div className='flex justify-center items-center h-full'>  <Empty className=''  /></div>
          
          )}
        </div>
      </div>
    </div></div>
  );
}

export default Student;
