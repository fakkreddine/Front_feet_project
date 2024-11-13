import React from 'react'
import Notecard from './Notecard'
import "../css/note.css"

function Note() {
  return (
    <div className='w-full h-full'>
<h1 className='ubuntu-medium text-3xl font-normal lg:text-lg  px-6 '>My Notes</h1>

<div className='note-container  flex justify-center items-center gap-5  w-full h-full'>
    <Notecard></Notecard>
    <Notecard></Notecard>
    <Notecard></Notecard>
    <Notecard></Notecard>
</div>

    </div>
  )
}

export default Note