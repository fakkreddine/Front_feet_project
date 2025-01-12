import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
function Aside_v2() {
    const [isHovered, setIsHovered] = useState(false);
    return (

        <aside
            class={`fixed top-0 left-0 z-40 overflow-hidden  h-screen pt-8 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 peer h-screen bg-gray-800 w-20 transition-all duration-300 hover:w-64  group `}>

            <div class="flex flex-col items-start peer w-16  hover:w-64 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">

                <Link to={"/Superadmindash"} className=" pl-6 flex items-center w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
                    <div className="flex justify-center items-center w-10 h-10">
                        <svg className="w-[30px] h-[30px] object-contain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
    Dashboard
  </span>
                </Link>



                <Link to={"/Userstable"} className=" pl-6 flex items-center  w-full p-2 text-base font-medium text-gray-500 focus:outline-none transition-colors duration-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800  overflow-hidden group hover:text-blue-500  hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800">
                    <div className="flex justify-center items-center w-10 h-10">
                        <svg className="w-[25px] h-[25px] object-contain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-100%] transition-all duration-100 whitespace-nowrap">
  Admins and session managment
  </span>
                </Link>




            </div>


        </aside>
    )
}

export default Aside_v2