import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@auth0/auth0-react'
import { useAuth } from '../Auth/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { addSession } from '../Redux/Session';
import { Navigate, useNavigate } from 'react-router-dom'

function SessionM(props) {
  const dispatch = useDispatch()
  let {user}=useAuth()
  let [session,setSession]=useState({})
  useEffect(()=>{
    try{axios.get(`http://localhost:8081/admin/sessions/${props.item}`).then(res=>{
      console.log(res.data)
      setSession(res.data)
    })}
    catch (error) {
      console.error("Error fetching roles:", error.message);
    }
  },[])
  let navigate =useNavigate();
  let red=()=>{
    dispatch(addSession(props.item))
    navigate("/dash")
  }
  return (
    <button onClick={red} className='h-40'  disabled={!props.item}>
      
<div  class="relative p-6  block   gap-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<div className="absolute top-0 left-0 p-2 "><span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                Active
            </span> </div>
<h5 class="  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{session.universityName}</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{session.year}/{parseInt(session.year)+1}</p>

            <div class=" mt-3 flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-shrink-0">
                <img class="w-8 h-8 rounded-full" src= {user.reloadUserInfo.photoUrl} alt="Neil image"/>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                {user.reloadUserInfo.displayName}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                   {user.reloadUserInfo.email}
                </p>
            </div>
           
        </div>
       
</div>


    </button>
  )
}

export default SessionM