import React, { useState, useEffect ,useRef} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button } from 'antd';
import "../css/manuel.css"
import { useSelector } from 'react-redux';
import Nav from "../component/Nav";
import Aside_v2 from '../component/Aside_v2';

import {PlusOutlined} from '@ant-design/icons';
import { Drawer } from "antd";
import { createSwapy ,swapyRef,utils } from 'swapy'

import Side from '../component/Side';
const Loader = () => (
    <div className="flex justify-center items-center h-full">
        <div className="loader"></div>
    </div>
);

const Emplo_fakhri = () => {


    const [open, setOpen] = useState(true);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    const sessionId = useSelector((state) => state.session.value);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [programData, setProgramData] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [TimetableDat,setTimetableData] =useState([]);
    const [weekSchedule, setWeekSchedule] = useState([
        {
            day: "Monday",
            sessions: [
                { time: "8:00 - 9:30", uid: 1, value: "f" },
                { time: "9:30 - 11:00", uid: 2, value: "" },
                { time: "11:00 - 12:30", uid: 3, value: "" },
                { time: "12:30 - 2:00", uid: 4, value: "" },
                { time: "2:00 - 3:30", uid: 5, value: "" },
                { time: "3:30 - 5:00", uid: 6, value: "" },
                { time: "5:00 - 6:30", uid: 7, value: "" },
            ],
        },
         {
            day: "Tuesday",
            sessions: [
                { time: "8:00 - 9:30", uid: 8, value: "" },
                { time: "9:30 - 11:00", uid: 9, value: "" },
                { time: "11:00 - 12:30", uid: 10, value: "" },
                { time: "12:30 - 2:00", uid: 11, value: "" },
                { time: "2:00 - 3:30", uid: 12, value: "" },
                { time: "3:30 - 5:00", uid: 13, value: "" },
                { time: "5:00 - 6:30", uid: 14, value: "" },
            ],
        },
        {
            day: "Wednesday",
            sessions: [
                { time: "8:00 - 9:30", uid: 15, value: "" },
                { time: "9:30 - 11:00", uid: 16, value: "" },
                { time: "11:00 - 12:30", uid: 17, value: "" },
                { time: "12:30 - 2:00", uid: 18, value: "" },
                { time: "2:00 - 3:30", uid: 19, value: "" },
                { time: "3:30 - 5:00", uid: 20, value: "" },
                { time: "5:00 - 6:30", uid: 21, value: "" },
            ],
        },
       {
            day: "Thursday",
            sessions: [
                { time: "8:00 - 9:30", uid: 22, value: "" },
                { time: "9:30 - 11:00", uid: 23, value: "" },
                { time: "11:00 - 12:30", uid: 24, value: "" },
                { time: "12:30 - 2:00", uid: 25, value: "" },
                { time: "2:00 - 3:30", uid: 26, value: "" },
                { time: "3:30 - 5:00", uid: 27, value: "" },
                { time: "5:00 - 6:30", uid: 28, value: "" },
            ],
        },
       {
            day: "Friday",
            sessions: [
                { time: "8:00 - 9:30", uid: 29, value: "" },
                { time: "9:30 - 11:00", uid: 30, value: "" },
                { time: "11:00 - 12:30", uid: 31, value: "" },
                { time: "12:30 - 2:00", uid: 32, value: "" },
                { time: "2:00 - 3:30", uid: 33, value: "" },
                { time: "3:30 - 5:00", uid: 34, value: "" },
                { time: "5:00 - 6:30", uid: 35, value: "" },
            ],
        },
        {
            day: "Saturday",
            sessions: [
                { time: "8:00 - 9:30", uid: 36, value: "" },
                { time: "9:30 - 11:00", uid: 37, value: "" },
                { time: "11:00 - 12:30", uid: 38, value: "" },
                { time: "12:30 - 2:00", uid: 39, value: "" },
                { time: "2:00 - 3:30", uid: 40, value: "" },
                { time: "3:30 - 5:00", uid: 41, value: "" },
                { time: "5:00 - 6:30", uid: 42, value: "" },
            ],
        },
        {
            day: "Sunday",
            sessions: [
                { time: "8:00 - 9:30", uid: 43, value: "" },
                { time: "9:30 - 11:00", uid: 44, value: "" },
                { time: "11:00 - 12:30", uid: 45, value: "" },
                { time: "12:30 - 2:00", uid: 46, value: "" },
                { time: "2:00 - 3:30", uid: 47, value: "" },
                { time: "3:30 - 5:00", uid: 48, value: "" },
                { time: "5:00 - 6:30", uid: 49, value: "" },
            ],
        },
    ]);
    const [slotItemMap, setSlotItemMap] = useState(utils.initSlotItemMap(weekSchedule, 'weekSchedule'));

    


    useEffect(() => {
        if (!sessionId) {
            setError("No session ID found.");
            return;
        }
        const fetchGroups = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/sessions/${sessionId}`);
                const session = response.data;

                if (session?.department?.length > 0) {
                    const groupsList = session.department[0]?.groups || [];
                    setGroups(groupsList);
                } else {
                    setError("No valid department data found.");
                }
            } catch (err) {
                setError("Failed to fetch session data.");
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [sessionId]);

    const fetchGroupProgram = async (groupId) => {
        if (!sessionId || !groupId) {
            setError("Session ID or Group ID is missing.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const selectedGroupData = groups.find(group => group._id === groupId);
            const groupName = selectedGroupData?.groupName;

            if (!groupName) {
                setError("Group name not found for the selected group.");
                return;
            }
                fetchtimetable(groupName)
            const departmentResponse = await axios.get(
                `http://localhost:5000/get-department-id-by-group?groupName=${groupName}&sessionId=${sessionId}`
            );
            const departmentId = departmentResponse.data?.departmentId;

            if (!departmentId) {
                setError("Department ID not found for the selected group.");
                return;
            }

            const programResponse = await axios.get(
                `http://localhost:8081/admin/session/${sessionId}/department/${departmentId}/group/${groupId}`
            );

            setProgramData(programResponse.data);
            setSuccessMessage("Program fetched successfully.");
        } catch (err) {
            setError("Failed to fetch group program.");
        } finally {
            setLoading(false);
        }
    };

    const handleGroupChange = (event) => {
        const groupId = event.target.value;
        setSelectedGroup(groupId);
        setProgramData(null);
        if (groupId) {
            fetchGroupProgram(groupId);
        }
    };




    const fetchtimetable=async(groupName)=>{
        try {
            const response = await axios.get(`http://localhost:5000/get-timetable-by-group-and-session?groupName=${groupName}&sessionId=${sessionId}`);
            
      
           
          } catch (err) {
            if (err.response.status=404){
                setTimetableData([])
            }else{
                console.log("server error")
            }
          }}
    //swappy

    const swapy = useRef(null)
    const container = useRef(null)
    
    useEffect(() => {
        console.log(TimetableDat)
        // If container element is loaded
        if (container.current) {
          swapy.current = createSwapy(container.current)
    
          // Your event listeners
          swapy.current.onSwap((event) => {
            //console.log('swap', event);
          })
          swapy.current.onBeforeSwap((event) => {
            if ((event.fromSlot=='Slot_slot'||event.toSlot=='Slot_slot')||(event.fromSlot=='slot_break'||event.toSlot=='slot_break')||(event.fromSlot=='Slot_empty'||event.toSlot=='Slot_empty')) {
            console.log(event)
                
                return false
            }else{
                return true
            }

          })

          swapy.current.onSwapEnd(event=>{
            console.log("end",event)

          })
        }
       
    
        return () => {
          // Destroy the swapy instance on component destroy
          swapy.current?.destroy()
        }
      }, [open,programData])




    

    return (
            <div className="flex ">
                <Aside_v2/>
                <Nav/>
                <div    ref={container} className="main-container  flex w-full !flex-row  gap-5 ">

                    <div className="content-container ">
                        {loading && <Loader/>}
                        {error && <div className="error-message">{error}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        <div className="group-selector">
                            <label htmlFor="group-select">Select Group:</label>
                            <select
                                id="group-select"
                                value={selectedGroup}
                                onChange={handleGroupChange}
                            >
                                <option value="">-- Select a Group --</option>
                                {groups.map((group) => (
                                    <option key={group._id} value={group._id}>
                                        {group.groupName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {programData && (
                            <div className="program-data">
                                <div className="flex justify-between items-center  my-4 mx-2 ">        <h3>Program for {selectedGroup}</h3> 
                                <div className="flex justify-center items-center">
                                
    <button onClick={showDrawer} className="flex items-center justify-center text-blue-600 bg-blue-100 rounded-full  text-2xl font-bold p-2 hover:bg-blue-200 hover:shadow-lg focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
        <PlusOutlined />
    </button>
    </div>


   
    </div>
                            
                
                                <div class="overflow-x-auto">
    <table class="min-w-full bg-white text-sm text-left text-gray-500 border-collapse border border-gray-300 dark:bg-gray-800 dark:text-gray-400">
        <thead class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-300">
        <tr>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">Day</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">8:00 - 9:30</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">9:30 - 11:00</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">11:00 - 12:30</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">12:30 - 2:00</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">2:00 - 3:30</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">3:30 - 5:00</th>
            <th scope="col" class="px-6 py-4 text-center border border-gray-300">5:00 - 6:30</th>
        </tr>
        </thead>
        <tbody>
        {Object.keys(weekSchedule).map((days,index)=>{
              
              return (  <tr class="bg-white dark:bg-gray-800">
                 <td class="px-6 py-4 text-center font-medium border border-gray-300">{}{weekSchedule[days].day}</td>
                 {weekSchedule[days].sessions.map(hour=>{
                    console.log("hour",hour)
                      return (<td  data-swapy-slot={`${hour.time}_${hour.uid}`} class="px-6 py-6 text-center border border-gray-300" id="monday-5-630">
                        
        <div data-swapy-item={`${hour.time}_${hour.uid}slot`} className="bg-gray-200 w-20">     {hour.value==''? <Button
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={() => console.log('Plus button clicked!')}
    />:<p>fakkhr</p>}
        </div>
   
                      </td>)
                 })}
              
               
             </tr>)
            })}
       
        </tbody>
    </table>
    </div>



                            </div>
                        )}
                    </div>
                
                    <div
  className="w-1/3 border rounded-lg bg-[#f9f9f9] shadow-md text-gray-700"

>
  <Side onClose={onClose} open={open}  />
</div>


               
                </div>  
            

                
   
        


            </div>
    );
};

export default Emplo_fakhri;
