import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
function Aside_v2_student() {
    const [isHovered, setIsHovered] = useState(false);
    return (

        <aside
            class={`fixed top-0 left-0 z-40 overflow-hidden mt-6   transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 peer h-screen bg-gray-800 w-20 transition-all duration-300 hover:w-64  group `}>

            <div class="flex flex-col items-start peer w-16  hover:w-64 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">

                <Link to={"/StudentDashboard"} className=" pl-6 flex items-center w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
                    <div className="flex justify-center items-center w-10 h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
    Overview
  </span>
                </Link>
            </div>


        </aside>
    )
}

export default Aside_v2_student;