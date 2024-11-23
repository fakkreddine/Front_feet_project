import React, { useState } from 'react';
import Nav from '../../component/Nav';
import plus from "../../assets/plus.png";
import SessionM from '../../component/SessionM';
import { useAuth } from '../../Auth/AuthContext';
import { Modal, Button, message } from 'antd';
import axios from 'axios';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [braik, setBraik] = useState('');
  const [endBraik, setEndBraik] = useState('');
  const [daystart, setDaystart] = useState('');
  const [dayend, setDayend] = useState('');
  const [days, setDays] = useState([]);
  const { userDetails, setdetail,user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'All the inputs are required!',
    });
  };

  const updaterole=(res)=>{
    console.log(userDetails)
    axios.put('http://localhost:8081/roles/update/'+user.uid,{
      ...userDetails,
      "sessionList": [
        ...(userDetails?.sessionList || []), // Spread the existing sessionList or use an empty array if it's undefined
        res.data.sessionId, // Add the new sessionId
      ]

   }).then(
    setdetail({
      ...userDetails,
      "sessionList": [
        ...(userDetails?.sessionList || []), // Spread the existing sessionList or use an empty array if it's undefined
        res.data.sessionId, // Add the new sessionId
      ]

   })
   ) 

  }
  const handleOk = () => {
    if (name && year && braik && endBraik && daystart && dayend && days.length) {

      const payload={
    "year": year,
    "universityName":  name,
    "timeBreakStart":  braik,
    "timeBreakEnd": endBraik,
    "timeDayStart":  daystart,
    "timeDayEnd": dayend,
    "activeDays":  days
    }
    console.log(payload)
axios
.post('http://localhost:8081/admin/sessions', payload)
.then((response) =>{ console.log(response) ;
  setIsModalOpen(false);
  updaterole(response)}
) 
.catch((error) => console.error(error));
    
  } else {
    error();
  }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='   w-full h-[calc(100vh-80px)]  mt-11 pt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 flex justify-center items-center'>
        <Nav />
        <div className=' h-4/5'>   <div className='flex w-full h-full justify-center items-center gap-5 '>
          
          <div className='flex flex-wrap gap-8 w-full h-full'>
          <button
            onClick={showModal}
            className="flex flex-col items-center justify-center w-40 h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <img className='w-5 h-5' src={plus} alt="Add" />
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Add Session
            </p>
          </button> {userDetails?.sessionList?.map((item, index) => (
            <SessionM key={index} item={item} />
          ))}</div>
         
        </div>
      </div>
      <Modal title="Add Session" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="p-4 md:p-5">
          {contextHolder}
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                University Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Type university name"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Academic Year
              </label>
              <input
                onChange={(e) => setYear(e.target.value)}
                type="number"
                id="year"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Academic year"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="braik"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Break Start
              </label>
              <input
                onChange={(e) => setBraik(e.target.value)}
                type="time"
                id="braik"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="endBraik"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Break End
              </label>
              <input
                onChange={(e) => setEndBraik(e.target.value)}
                type="time"
                id="endBraik"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="daystart"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Day Start
              </label>
              <input
                onChange={(e) => setDaystart(e.target.value)}
                type="time"
                id="daystart"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="dayend"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Day End
              </label>
              <input
                onChange={(e) => setDayend(e.target.value)}
                type="time"
                id="dayend"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="days"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Active Days
              </label>
              <div className="flex flex-wrap block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                  (day) => (
                    <div key={day} className="mr-4 mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={day}
                        onChange={() => handleCheckboxChange(day)}
                        className="mr-2"
                      />
                      <label htmlFor={day} className="text-sm text-gray-700 dark:text-gray-400">
                        {day}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal></div>
     
    </>
  );
}

export default Home;
