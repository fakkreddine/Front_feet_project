import React from 'react'
import edit from "../assets/edit.png"
import { Divider } from "antd";

function Notecard(props) {
  return (
    <div className={props.data.color+' flex flex-col note  justify-between p-5  my-2 h-70 w-70  card_note  p-3 rounded-md'}>
      <div ><p class=" text-xs text-gray-600 dark:text-gray-400">11/12/2021</p>
        <div className='flex justify-between  my-2'><h1 className='text-2xl text-gray-900 dark:text-white font-medium'> {props.data.name}</h1> <img className='w-5 h-5' src={edit}/></div>
        <Divider style={{"margin":"0"}} />
        <p className='my-4' >{props.data.descritpion} </p></div>
        
        <div> <span class="inline-flex items-center bg-red-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-green-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                {props.data.tag}
            </span></div>
       

        
    </div>
  )
}

export default Notecard