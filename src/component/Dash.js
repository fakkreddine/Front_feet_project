  import React, { useEffect } from 'react'
  import Stats from './Stats'
  import classes from "../assets/presentation.png"
  import student from "../assets/graduation.png"
  import teacher from "../assets/school.png"
  import table from "../assets/schedule.png"
  import group from "../assets/multiple-users-silhouette.png"
  import department from "../assets/structure.png"
  import subject from "../assets/justify-paragraph.png"
  import Note from './Note'
  import Cal from './Cal'

  import {Badge} from 'antd';

  import { Card } from 'antd'
  import {AnimatedTooltip} from './dashcomp/animated-tooltip'
  import { useNavigate } from 'react-router-dom'
  import { useSelector } from 'react-redux'
  import Aside_v2 from './Aside_v2'
  import Pie from './Pie'
  import Usage from './Usage'
  import DataTransferStats from './DataTransferStats'
import MongoStats from './MongoStats'


  function Dash() {
    const sessionId = useSelector((state) => state.session.value);
    const people = [
      {
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      },
      {
        id: 2,
        name: "Robert Johnson",
        designation: "Product Manager",
        image:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 3,
        name: "Jane Smith",
        designation: "Data Scientist",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 4,
        name: "Emily Davis",
        designation: "UX Designer",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 5,
        name: "Tyler Durden",
        designation: "Soap Developer",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
      },
      {
        id: 6,
        name: "Dora",
        designation: "The Explorer",
        image:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
      },
    ];
    
    
    return (
      <><Aside_v2></Aside_v2>
      <main class=" ml-24 mt-15 pt-14  transition-all duration-300   peer-hover:ml-64 h-screen  p-4   " style={{height:"100vh"}}>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
        <div>
          <Stats img={classes} api={`http://localhost:8081/admin/sessions/${sessionId}/room-count`} subject={false}  text="Total Classes"></Stats>
      </div>
      <div>
          <Stats img={student} api={`http://localhost:8081/admin/sessions/${sessionId}/student-count`} subject={false}  text="Total Student"></Stats>
      </div>
      <div>
          <Stats img={teacher} api={`http://localhost:8081/admin/sessions/${sessionId}/teacher-count`}subject={false}  text="Total Teacher"></Stats>
      </div>
      <div>
          <Stats img={table}  api={`http://localhost:8081/admin/sessions/${sessionId}/student-count`}subject={false}  text="Total Schedule"></Stats>
      </div> 
      <div>
          <Stats img={group} api={`http://localhost:8081/admin/sessions/${sessionId}/group-count`} subject={false} text="Total Groupes"></Stats>
      </div>
      <div>
          <Stats img={department}  api={`http://localhost:8081/admin/sessions/${sessionId}/department-count`}  subject={false} text="Total Depatments"></Stats>
      </div>
      <div>
          <Stats img={subject}  api={[`http://localhost:8081/admin/sessions/${sessionId}/subject-lab-count`,`http://localhost:8081/admin/sessions/${sessionId}/subject-lecture-count`]} subject={true}  text="Total Subjects"></Stats>
      </div>
      <div >
        <Card style={{width:"100%"}}>
          <div className='flex mb-2'><AnimatedTooltip items={people}></AnimatedTooltip></div>
        
        
      <div className='flex  justify-between'><Badge
          className="site-badge-count-109"
          count={"+3%"}
          style={{ backgroundColor: '#52c41a' }}
        /> <p className='mx-2  text-gray-500'>Our Teacher</p></div>
  </Card>
        
      </div> 
  
      </div>



      <div
        class=" border-gray-300 dark:border-gray-600 h-96 mb-4 mt-6"
      > <Card><Note></Note></Card></div>
      
      <h3 class="my-16 mb-4 text-xl font-bold tracking-tight leading-none text-gray-900  dark:text-white">Mongo Db Stats</h3>
      <div
        class="p-9 flex rounded-lg  gap-10 border-gray-300 dark:border-gray-600 h-[90%] mb-4"
      > <Pie/>
      <Usage  />
      
      
      </div>

      <div
        class=" my-10  w-full rounded-lg  shadow-lg  border-gray-300 dark:border-gray-600 gap-10 p-6  "
      > 
     
      <MongoStats/>
      
      </div>

      <div
        class="flex w-full h-[90%] rounded-lg  shadow-lg  border-gray-300 dark:border-gray-600 mb-4"
      > 
      <DataTransferStats />
      
     
      
      </div>
      
    </main>
      </>
    
    )
  }

  export default Dash