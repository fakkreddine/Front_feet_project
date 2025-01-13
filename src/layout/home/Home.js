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
      console.log("Fetched user details:", response.data);
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
        adminUserId: userDetails?.idUser  // Assuming the user ID is available in userDetails
      };

      axios
          .post('http://localhost:5000/add-session', payload)  // New API endpoint
          .then((response) => {
            setIsModalOpen(false);  // Close the modal
            messageApi.success("Session added successfully!");  // Show success message
          })
          .catch((error) => {
            console.error("Error adding session:", error);
            messageApi.error("Failed to add session. Please try again later.");
          });
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
                {/* Display the user role */}
                <div className="w-full mb-4 text-center">
                  <p className="text-xl font-semibold text-gray-700 dark:text-white">
                    {userDetails?.roleUser ? `User Role: ${userDetails.roleUser}` : "Loading role..."}
                  </p>
                </div>


                {userDetails.roleUser === "Admin" && (
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
              {/* University Name */}
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

              {/* Year */}
              <div className="col-span-2">
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Year
                </label>
                <input
                    onChange={(e) => setYear(e.target.value)}
                    type="text"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type year"
                    required
                />
              </div>

              {/* Break Start */}
              <div className="col-span-2">
                <label htmlFor="braik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Break Start Time
                </label>
                <input
                    onChange={(e) => setBraik(e.target.value)}
                    type="time"
                    id="braik"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                />
              </div>

              {/* Break End */}
              <div className="col-span-2">
                <label htmlFor="endBraik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Break End Time
                </label>
                <input
                    onChange={(e) => setEndBraik(e.target.value)}
                    type="time"
                    id="endBraik"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                />
              </div>

              {/* Day Start */}
              <div className="col-span-2">
                <label htmlFor="daystart" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Day Start Time
                </label>
                <input
                    onChange={(e) => setDaystart(e.target.value)}
                    type="time"
                    id="daystart"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                />
              </div>

              {/* Day End */}
              <div className="col-span-2">
                <label htmlFor="dayend" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Day End Time
                </label>
                <input
                    onChange={(e) => setDayend(e.target.value)}
                    type="time"
                    id="dayend"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                />
              </div>

              {/* Active Days */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Active Days
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                      <label key={day} className="inline-flex items-center">
                        <input
                            type="checkbox"
                            value={day}
                            onChange={() => handleCheckboxChange(day)}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">{day}</span>
                      </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Modal>

      </>
  );
}

export default Home;
