import React, { useState } from 'react';
import { Avatar, Badge, Empty, Dropdown, message ,Modal } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { Menu } from "antd";
import axios from 'axios';
import { useSelector } from 'react-redux';

function Studentoverview({ data, department, setData ,relode}) { // Accept setData as a prop to update data externally
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setname] = useState();
  const [email  , setemail] = useState();
  const [uid, setuid] = useState();
  const [cin  , setcin] = useState();
  const [group  , setgroup] = useState();
  const sessionId = useSelector((state) => state.session.value);

  const showModal = () => {
    setIsModalOpen(true);
    setname(selected.name)
    setemail(selected.email)
    setuid(selected.id)
    setcin(selected.cin)
    setgroup(selected.group)
   };
const updteStudent=async()=>{
    try {
       const{data:response=[]}= await axios.put(`http://localhost:8081/admin/session/${sessionId}/departments/${department}/groups/${data.groupId}/students/${selected.id}`,{
       
          "name": name,
          "email": email,
          "cin": cin,
          "group": group
        })
        message.success('student  update successfuly ');
        relode()
        setIsModalOpen(false);
        
        
    } catch (error) {
        console.log(error)
        message.error('Failed to update student');
        
    }

}
  const handleOk = () => {
    setIsModalOpen(false);
    updteStudent()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const deleteRow = async () => {
    try {
        await axios.delete(`http://localhost:8081/admin/session/${sessionId}/departments/${department}/groups/${data.groupId}/students/${selected.id}`);
        message.success('Student deleted successfully');
        
        // Update the local data to trigger re-render
        const updatedStudents = data.students.filter(student => student.id !== selected.id);
       // Update the parent state if se
      relode()
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('Failed to delete student');
    }
  };

  const onClick = ({ key }) => {
    if (key === '1') {
      deleteRow();
    }else{
        showModal()

    }
  };

  const items = [
    {
      label: (
        <button>Edit</button>
      ),
      key: '0',
    },
    {
      label: (
        <button className='flex justify-center items-center gap-5 text-red-600'>
          <span>Delete</span>
          <DeleteFilled />
        </button>
      ),
      key: '1',
    },
  ];

  const filteredStudents = data?.students?.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <> <ul class="flex justify-center flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <li class="me-2 ">
        <button  class=" focus:text-blue-600  focus:border-blue-600 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" >
            <svg class=" group-focus:text-blue-600 w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>Overview
        </button>
    </li>
    <li class="me-2">
        <button   class=" focus:text-blue-600   focus:border-blue-600 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" aria-current="page">
            <svg class="w-4 h-4 me-2  group-focus:text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
            </svg>Manage Teacher
        </button>
    </li>
    
  
</ul>





<section className="h-full  pt-2">
        

      {data.students.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Empty description="No students found" />
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Cin
                    </th>
                    <th scope="col" className="px-4 py-3">
                      UID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Group
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      className="border-b dark:border-gray-700"
                      key={student.id}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex gap-4 items-center">
                          <Avatar
                            size={30}
                            icon={student.name[0]}
                            style={{ backgroundColor: getRandomColor() }}
                          />
                          <div>
                            <h2>{student.name}</h2>
                            <p className="text-gray-400 font-normal">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="px-4 py-3">{student.cin}</td>
                      <td className="px-4 py-3">{student.id}</td>
                      <td className="px-4 py-3">{student.group}</td>
                      <td>
                        <Badge status="success" /> Active
                      </td>
                      <td className="py-5 flex items-center justify-center">
                        <button
                          onClick={() => { setSelected(student); }}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                        >
                          <Dropdown menu={{ items, onClick }} trigger={['click']}>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </Dropdown>

                          <Modal title="Edit Student" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                          <div class="relative p-4 w-full max-w-md max-h-full">
        
        <div class="w-full  ">
          
            
           
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                    </div>
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={email}   onChange={(e)=>{setemail(e.target.value)}} type="text" name="Email" id="Email" class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-not-allowed" placeholder="john@example.com" disabled/>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UID</label>
                        <input value={uid} onChange={(e)=>{setuid(e.target.value)}}type="text" name="UID" id="UID" class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-not-allowed" placeholder="CIN0012345" disabled  />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN</label>
                        <input  value={cin}  onChange={(e)=>{setcin(e.target.value)}}  type="text" name="CIN" id="CIN" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="tF9jbhXoidSDtRui86lpnBdgzjC3" required=""/>
                       
                    </div>
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
                        <input value={group}   onChange={(e)=>{setgroup(e.target.value)}} type="text" name="Group" id="Group" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Group A" required=""/>
                    </div>
                  
                   
                   
                </div>
               
            </form>
        </div>
    </div>
                     </Modal>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section></>
    
  );
}

export default Studentoverview;
