import React, { useState, useEffect } from 'react';
import Nav from '../../component/Nav';
import plus from "../../assets/plus.png";
import SessionM from '../../component/SessionM';
import { useAuth } from '../../Auth/AuthContext';
import { Modal, message, Skeleton } from 'antd';
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
  const [loading, setLoading] = useState(true);
  const { userDetails, setdetail, user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    reload();
  }, []);

  // Function to reload data with retry logic
  const reload = async (attempts = 3, delay = 1000) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/roles/${user.uid}`);
      setdetail(response.data);
    } catch (error) {
      console.error(`Error loading user details (attempts left: ${attempts}):`, error);

      if (attempts > 0) {
        // Wait for the delay before retrying
        setTimeout(() => reload(attempts - 1, delay * 2), delay);
      } else {
        messageApi.error("Failed to load sessions. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

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

  const updaterole = async (res) => {
    try {
      await axios.put(`http://localhost:8081/roles/update/${user.uid}`, {
        ...userDetails,
        sessionList: [...(userDetails?.sessionList || []), res.data.sessionId],
      });
      setdetail({
        ...userDetails,
        sessionList: [...(userDetails?.sessionList || []), res.data.sessionId],
      });
      reload();
    } catch (error) {
      console.error("Error updating roles:", error);
    }
  };

  const handleOk = () => {
    if (name && year && braik && endBraik && daystart && dayend && days.length) {
      const payload = {
        year,
        universityName: name,
        timeBreakStart: braik,
        timeBreakEnd: endBraik,
        timeDayStart: daystart,
        timeDayEnd: dayend,
        activeDays: days,
      };
      axios
        .post('http://localhost:8081/admin/sessions', payload)
        .then((response) => {
          setIsModalOpen(false);
          updaterole(response);
        })
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
      <div className="w-full h-[calc(100vh-80px)] mt-11 pt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 flex justify-center items-center">
        <Nav />
        <div className="h-4/5">
          <div className="flex w-full h-full justify-center items-center gap-5">
            <div className="flex flex-wrap gap-8 w-full h-full">
              {userDetails.role === "Admin" && (
                <button
                  onClick={showModal}
                  className="flex flex-col items-center justify-center w-40 h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <img className="w-5 h-5" src={plus} alt="Add" />
                  <p className="font-normal text-gray-700 dark:text-gray-400">Add Session</p>
                </button>
              )}
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-40 h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <Skeleton.Input active size="small" className="mb-2" style={{ width: "70%" }} />
                      <Skeleton paragraph={{ rows: 1 }} title={false} active />
                    </div>
                  ))
                : userDetails?.sessionList?.map((item, index) => (
                    <SessionM role={userDetails} key={index} item={item} />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Modal title="Add Session" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="p-4 md:p-5">
          {contextHolder}
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            {/* Other Input Fields */}
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Home;
