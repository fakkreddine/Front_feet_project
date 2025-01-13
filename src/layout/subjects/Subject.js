import React, { useEffect, useState } from 'react';
import Nav from '../../component/Nav';
import Aside_v2 from '../../component/Aside_v2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusOutlined,DeleteFilled,ReloadOutlined  } from '@ant-design/icons';
import { Empty, Spin } from 'antd'; // Import Spin for loading indicator
import { Tooltip } from "antd";
import { Button, Modal } from 'antd';
import { message  } from "antd";
import{ Dropdown }from "antd"
;

function Subject() {

    const[edit,setedit]=useState(false)
    const onClick = ({ key }) => {
        if (key === '0') {
        setedit(true)
           setname(selected.subjectName)
           setduration(selected.duration)
           setcat(selected.type )


            showModal()
        }else{
            (async()=>{
try {
    const{data:response}=await axios.delete(`http://localhost:8081/admin/session/${sessionId}/subject/${selected.id}`)
    success("deleted successfully")
    fetchData()
} catch (error) {
    error(error)
}




            })()

        }}
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
  const sessionId = useSelector((state) => state.session.value);
  let [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setselceted] = useState();
  const [name, setname] = useState();
  const [duration, setduration] = useState();
  const [cat, setcat] = useState('Lecture');


  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
   if (!edit) {
    try {
        const {data:response=[]}=await axios.post(`http://localhost:8081/admin/session/${sessionId}/subject`,{
            "subjectName": name,
            "duration": duration,
            "type":cat
            })
            console.log(response)
            success("Subject addes successfully ")
            setIsModalOpen(false);
            fetchData()
    } catch (err) {
        showError('Operation failed');
        console.error(err);
    }

   }else{
    try {
        const {data:response=[]}=await axios.put(`http://localhost:8081/admin/session/${sessionId}/subject/${selected.id}`,{
            "subjectName": name,
            "duration": duration,
            "type":cat
            })
            console.log(response)
            success("Subject edited successfully ")
            setIsModalOpen(false);
            fetchData()
    } catch (error) {
        error(error)
    }
   }


  };
    const showError = (msg) => {
        messageApi.open({ type: 'error', content: msg });
    };

  const handleCancel = () => {
    setIsModalOpen(false);

  };



  const [loading, setLoading] = useState(true); // New state for loading

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const { data: response } = await axios.get(`http://localhost:8081/admin/session/${sessionId}/subjects`);
      setSubjects(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

      <Nav />
      <Aside_v2 />
      <div className="mt-15 pt-20 ml-24 pl-5 transition-all duration-300 peer-hover:ml-64 h-screen">
      {contextHolder}
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
                  Subjects
                </span>
              </div>
            </li>
          </ol>
        </nav>
          <Modal title={!edit ? "Add Subject" : "Edit Subject"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input
                              onChange={(e) => setname(e.target.value)}
                              value={name}
                              type="text"
                              name="name"
                              id="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Type Subject name"
                              required
                          />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                          <input
                              onChange={(e) => {
                                  const value = e.target.value;
                                  if (value >= 0) {
                                      setduration(value);
                                  } else {
                                      alert("Duration cannot be negative!");
                                  }
                              }}
                              value={duration}
                              type="number"
                              name="price"
                              id="price"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="3 Hours"
                              required
                          />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                          <select
                              onChange={(e) => setcat(e.target.value)}
                              value={cat}
                              id="category"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          >
                              <option value="Lecture">Lecture</option>
                              <option value="Lab">Lab</option>
                          </select>
                      </div>
                  </div>
              </form>
          </Modal>





          <section className=" dark:bg-gray-900 p-3 sm:p-5">
          <div className="mx-auto border shadow-md rounded-lg border-gray-200 p-6  ">
            <div className="bg-white  dark:bg-gray-800 relative   overflow-hidden">
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
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button onClick={fetchData}
                    type="button"
                    className="flex items-center justify-center bg-white border text-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-3"
                  >
                   < ReloadOutlined/>
                    Relode
                  </button>
                  <button onClick={showModal}
                    type="button"
                    className="flex items-center justify-center text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <PlusOutlined />
                    Add Subject
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto ">
                {loading ? ( // Check loading state
                  <div className="flex justify-center py-10">
                    <Spin size="large" />
                  </div>
                ) : (
                  <table className="  w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Subject Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Id
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Duration
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Type
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full relative">
                      {subjects.length === 0 ? (
                        <tr>
                          <td colSpan="6">
                            <Empty />
                          </td>
                        </tr>
                      ) : (
                        subjects.map((subject) => (
                          <tr key={subject.id} className="border-b dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {subject.subjectName}
                            </th>
                            <td className="px-4 py-3">{subject.id}
                            <Tooltip title="ID in mongodb">  <span class="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold    rounded-full dark:bg-gray-700 dark:text-blue-400">
<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
</svg>
<span class="sr-only">Icon description</span>
</span></Tooltip>
                              </td>
                            <td className="px-4 py-3">
                            <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{subject.duration}
</span>

                                </td>
                            <td className="px-4 py-3"><span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                Active
            </span></td>
                            <td className="px-4 py-3">

                            <span class={subject.type=='Lecture'?"bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300":"bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300"}>{subject.type}</span>
                            </td>
                            <td className="px-4 py-3 flex items-center justify-end">

                                <button onClick={()=>{setselceted(subject)}}>  <Dropdown menu={{ items, onClick }} trigger={['click']}>
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 3a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
</Dropdown></button>


                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>


        </section>
      </div>
    </>
  );
}

export default Subject;
