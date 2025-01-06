import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
function Aside_v2() {
    const [isHovered, setIsHovered] = useState(false);
  return (
    
    <aside   
   class={`fixed top-0 left-0 z-40 overflow-hidden  h-screen pt-8 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 peer h-screen bg-gray-800 w-20 transition-all duration-300 hover:w-64  group `}>
    
    <div class="flex flex-col items-start peer w-16  hover:w-64 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
       
    <Link to={"/dash"} className=" pl-6 flex items-center w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg className="w-[30px] h-[30px] object-contain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
</svg>
  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
    Overview
  </span>
</Link>



<Link to={"/dash/departments"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg className="w-[25px] h-[25px] object-contain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" clip-rule="evenodd"/>
</svg>
  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Departments
  </span>
</Link><Link to={"/dash/rooms"} className="pl-6 flex items-center w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 overflow-hidden group hover:text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
      <div className="flex justify-center items-center w-10 h-10">
        <svg
            className="w-[25px] h-[25px] object-contain"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
          <path
              fillRule="evenodd"
              d="M3 3h18v12H3V3zm2 10h14V5H5v8zm3 4h8v2H8v-2zM2 20h20v2H2v-2z"
              clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
    Classrooms
  </span>
    </Link>







      <Link to={"/dash/teachers"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10 ">
  <svg className="w-[30px] h-[30px] object-contain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
</svg>

  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Teacher
  </span>
</Link>

<Link to={"/dash/subjects"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg className="w-[30px] h-[30px] object-contain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z"/>
  <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z"/>
</svg>

  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Subjects
  </span>
</Link>
<Link to={"/dash/students"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg className="w-[30px] h-[30px] object-contain"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
</svg>

  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Student
  </span>
</Link>
<Link to={"/dash/Groups"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg className="w-[30px] h-[30px] object-contain"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
</svg>

  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Groups
  </span>
</Link>
        

<Link to={"/dash/schedule"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg className="w-[28px] h-[28px] object-contain"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2 8v-2h7v2H4Zm0 2v2h7v-2H4Zm9 2h7v-2h-7v2Zm7-4v-2h-7v2h7Z" clip-rule="evenodd"/>
</svg>

  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Schedule
  </span>
</Link>

        

      
    </div>
    
   
</aside>
  )
}

export default Aside_v2