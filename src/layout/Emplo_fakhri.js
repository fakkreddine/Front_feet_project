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
import { createSwapy ,swapyRef } from 'swapy'
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

    const [monday, setMonday] = useState( [
        "monday-8:00 - 9:30", 
        "monday-9:30 - 11:00", 
        "monday-11:00 - 12:30", 
        "monday-12:30 - 2:00", 
        "monday-2:00 - 3:30", 
        "monday-3:30 - 5:00", 
        "monday-5:00 - 6:30"
    ]);
    const [Tuesday, setTuesday] = useState( [
        "tuesday-8:00 - 9:30", 
        "tuesday-9:30 - 11:00", 
        "tuesday-11:00 - 12:30", 
        "tuesday-12:30 - 2:00", 
        "tuesday-2:00 - 3:30", 
        "tuesday-3:30 - 5:00", 
        "tuesday-5:00 - 6:30"
    ]);
    const [Wednesday, setWednesday] = useState([
        "wednesday-8:00 - 9:30", 
        "wednesday-9:30 - 11:00", 
        "wednesday-11:00 - 12:30", 
        "wednesday-12:30 - 2:00", 
        "wednesday-2:00 - 3:30", 
        "wednesday-3:30 - 5:00", 
        "wednesday-5:00 - 6:30"
    ]);
    const [Thursday, setThursday] = useState([
        "thursday-8:00 - 9:30", 
        "thursday-9:30 - 11:00", 
        "thursday-11:00 - 12:30", 
        "thursday-12:30 - 2:00", 
        "thursday-2:00 - 3:30", 
        "thursday-3:30 - 5:00", 
        "thursday-5:00 - 6:30"
    ]);
    const [Friday, setFriday] = useState([
        "friday-8:00 - 9:30", 
        "friday-9:30 - 11:00", 
        "friday-11:00 - 12:30", 
        "friday-12:30 - 2:00", 
        "friday-2:00 - 3:30", 
        "friday-3:30 - 5:00", 
        "friday-5:00 - 6:30"
    ]);
    const [Saturday, setSaturday] = useState([
        "saturday-8:00 - 9:30", 
        "saturday-9:30 - 11:00", 
        "saturday-11:00 - 12:30", 
        "saturday-12:30 - 2:00", 
        "saturday-2:00 - 3:30", 
        "saturday-3:30 - 5:00", 
        "saturday-5:00 - 6:30"
    ]);
    const [Sunday, setSunday] = useState( [
        "sunday-8:00 - 9:30", 
        "sunday-9:30 - 11:00", 
        "sunday-11:00 - 12:30", 
        "sunday-12:30 - 2:00", 
        "sunday-2:00 - 3:30", 
        "sunday-3:30 - 5:00", 
        "sunday-5:00 - 6:30"
    ]);
    const daysOfWeek = [monday,Tuesday, Wednesday, Thursday, Friday, Saturday,Sunday];
    const stringdays=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


    


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
            const fetchedData = response.data.timetable;
      
            if (Array.isArray(fetchedData)) {
              setTimetableData(fetchedData);
            } else {
              console.log("Invalid timetable data format.");
            }
          } catch (err) {
            console.log("Failed to fetch timetable.");
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
            console.log(event)
            if ((event.fromSlot=='Slot_slot'||event.toSlot=='Slot_slot')||(event.fromSlot=='slot_break'||event.toSlot=='slot_break')||(event.fromSlot=='Slot_empty'||event.toSlot=='Slot_empty')) {
                
                return false
            }else{
                return true
            }
            
               
            
            // 'a'
          
           
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
            {daysOfWeek.map((day,index)=>{
              return (  <tr class="bg-white dark:bg-gray-800">
                 <td class="px-6 py-4 text-center font-medium border border-gray-300">{}{stringdays[index]}</td>
                 {day.map(hour=>{
                      return (<td  data-swapy-slot={hour} class="px-6 py-6 text-center border border-gray-300" id="monday-5-630">
                        
        <div data-swapy-item={`${hour}slot`} className="bg-gray-200 w-20">      <Button
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={() => console.log('Plus button clicked!')}
    />
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
