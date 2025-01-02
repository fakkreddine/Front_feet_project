import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
function Aside_v2_teacher() {
    const [isHovered, setIsHovered] = useState(false);
  return (
    
    <aside   
   class={`fixed top-0 left-0 z-40 overflow-hidden  h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 peer h-screen bg-gray-800 w-20 transition-all duration-300 hover:w-64  group `}>
    
    <div class="flex flex-col items-start peer w-16  hover:w-64 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
       
    <Link to={"/dash"} className=" pl-6 flex items-center w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
    Overview
  </span>
</Link>



<Link to={"/dash/departments"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>  
  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Departments
  </span>
</Link>

       


<Link to={"/dash/session"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
  <div className="flex justify-center items-center w-10 h-10">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
  </div>
  <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Sessions
  </span>
</Link>


        


        

      
    </div>
    
   
</aside>
  )
}

export default Aside_v2_teacher