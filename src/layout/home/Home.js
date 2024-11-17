import React, { useEffect, useState } from 'react'
import Nav from '../../component/Nav'
import plus from "../../assets/plus.png"
import SessionM from '../../component/SessionM'
import { a } from 'framer-motion/client'
import { useAuth } from '../../Auth/AuthContext' 
import axios from 'axios'
function Home() {
  let [session,setSession]=useState([])
  let [role,setRole]=useState("user")
  const {user} =useAuth() ;
  useEffect(()=>{
    axios.get(`http://localhost:8081/roles/${user.uid}`).then(res => {
      setRole(res.data.roleUser)
      setSession(res.data.sessionList )
    })


  },[])

  return (
    <>
    <Nav></Nav>
    <div  className='h-[calc(100vh-50px)]  mt-11  pt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 flex justify-center items-center'>
      
      <div className='flex justify-center items-center gap-5 ' >
      <button  class="flex flex-col items-center justify-center w-40 h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
      <img className='w-5 h-5' src={plus}/>
    

<p class="font-normal text-gray-700 dark:text-gray-400">Add Session</p>
</button>
        
        {session.map((item)=>{
          return <SessionM></SessionM>
        })}
      </div>
      
     

    </div>
    </>
  )
}

export default Home