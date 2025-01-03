import React, { useEffect } from 'react'
import Nav from "../../component/Nav"
import Aside_v2_teacher from '../../component/Aside_v2_teacher'
import { useSelector } from 'react-redux';
import axios from 'axios';
function TeacherDash() {
    const sessionId = useSelector((state) => state.session.value);

    const fetchdata=async()=>{

        try {
            const {data:response} = await axios.get(`http://localhost:5000/get-timetable-by-teacher?teacherName=${"Dr. John Doe"}&sessionId=${sessionId}`)

            console.log(response)
        } catch (error) {
            console.log(error)
        }
      


    }
    useEffect(()=>{
     fetchdata()

    },[])
  return (
    <>
    <Nav/>
    <Aside_v2_teacher/>
    <div className='student'>

    </div>
    </>
  )
}

export default TeacherDash