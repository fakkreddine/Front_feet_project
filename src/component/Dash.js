import React from 'react'
import Stats from './Stats'
import classes from "../assets/presentation.png"
import student from "../assets/student.png"
import teacher from "../assets/teach.png"
import table from "../assets/calendar.png"
import Note from './Note'

function Dash() {
  return (
    <main class="p-4 md:ml-64 h-auto pt-20">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
      <div>
        <Stats img={classes}  text="Total Classes"></Stats>
    </div>
    <div>
        <Stats img={student}  text="Total Student"></Stats>
    </div>
    <div>
        <Stats img={teacher} text="Total Teacher"></Stats>
    </div>
    <div>
        <Stats img={table}  text="Total Schedule"></Stats>
    </div>  
 
    </div>
    <div
      class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4 mt-6"
    > <Note></Note></div>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
    </div>
    <div
      class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
    ></div>
    <div class="grid grid-cols-2 gap-4">
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
    </div>
  </main>
  )
}

export default Dash