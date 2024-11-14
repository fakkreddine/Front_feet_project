import React from 'react'
import Notecard from './Notecard'
import "../css/note.css"
import AddNew from './AddNew'
import "../css/note.css"
import { useState } from 'react';
import { Modal } from 'antd';
function Note() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='w-full h-full'>
<h1 className='ubuntu-medium text-3xl font-normal   px-4 '>My Notes</h1>

<div className='note-container  flex justify-center items-center gap-5  w-full h-full'>
    <Notecard back="bg_red"></Notecard>
    <Notecard back="bg_blue"></Notecard>
    <Notecard back="bg_yel"></Notecard>
    <AddNew show={showModal}></AddNew>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <div class="relative  w-full h-full">
        
        <div class="relative">
            
         
         
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                 
                  <div class="relative cursor-pointer gap-4 flex justify-start">
                  <button class="w-5 h-5 bg_red transition-all rounded-full block ring-[#efaaab] hover:ring-2 ring-offset-1 focus:ring-2"onClick={(e)=>{
                    e.preventDefault()
                  }}></button>
                  <button class="w-5 h-5 bg_blue transition-all rounded-full block ring-[#6cb5df] hover:ring-2 ring-offset-1 focus:ring-2" onClick={(e)=>{
                    e.preventDefault()
                  }}></button>
                  <button className='w-5 h-5 bg_yel transition-all rounded-full block ring-[#E9E582] hover:ring-2 ring-offset-1 focus:ring-2 ' onClick={(e)=>{
                    e.preventDefault()
                  }}> </button>
                 
                  
                  
                 
                   
                   
                  </div>
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Note Name" required=""/>
                    </div>
                    <div class="col-span-2">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                        <input type="text " name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Urgent" required=""/>
                    </div>
                    
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>

            </form>
        </div>
    </div>
 
</Modal>
    
</div>

    </div>
  )
}

export default Note