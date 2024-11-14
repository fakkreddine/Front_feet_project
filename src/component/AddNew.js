import React from 'react'
import edit from "../assets/edit.png"
import { useState } from 'react';
import { Modal } from 'antd';
function AddNew(props) {
  
  return (
    
    <button onClick={()=>{
      props.show()
    }} className='border-2 border-dashed rounded-lg h-40 p-7 flex justify-center items-center  '>

        <div className='flex flex-col  justify-center items-center w-36 '>
           <img className='w-5 h-5' src={edit}/>
           <h1> New Note</h1> 
        </div>
    </button>
  )
}

export default AddNew