import React from 'react'
import edit from "../assets/edit.png"
import { Divider } from "antd";
function Notecard() {
  return (
    <div className=' h-80 bg_red card_note  p-3 rounded-md'>
        <p class=" text-xs text-gray-600 dark:text-gray-400">11/12/2021</p>
        <div className='flex justify-between  my-2'><h1 className='text-2xl text-gray-900 dark:text-white'> mid test examin</h1> <img className='w-5 h-5' src={edit}/></div>
        <Divider style={{"margin":"0"}} />
        <p className='my-4' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
        



    </div>
  )
}

export default Notecard