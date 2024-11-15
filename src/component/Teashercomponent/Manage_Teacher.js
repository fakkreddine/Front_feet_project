import React from 'react'
import { useState } from 'react';
import { FileUpload } from '../dashcomp/FileUploadDemo';
import Papa from "papaparse"
import { Button } from 'antd';
import Spreadsheet from "react-spreadsheet";
function Manage_Teacher() {
    const [files, setFiles] = useState([]);
    let [uplaod,setupload]=useState(false)
   
    const data = [
        [{ value: "John Doe" }, { value: "12345678" }, { value: "johndoe@example.com" }],
        [{ value: "Jane Smith" }, { value: "87654321" }, { value: "janesmith@example.com" }],
        [{ value: "Alice Johnson" }, { value: "23456789" }, { value: "alicejohnson@example.com" }],
        [{ value: "Bob Brown" }, { value: "98765432" }, { value: "bobbrown@example.com" }],
        [{ value: "Emily Davis" }, { value: "34567890" }, { value: "emilydavis@example.com" }],
        [{ value: "Chris Wilson" }, { value: "87651234" }, { value: "chriswilson@example.com" }],
        [{ value: "Olivia White" }, { value: "45678901" }, { value: "oliviawhite@example.com" }],
        [{ value: "Liam Martin" }, { value: "98761234" }, { value: "liammartin@example.com" }],
        [{ value: "Sophia Taylor" }, { value: "56789012" }, { value: "sophiataylor@example.com" }],
        [{ value: "Mason Lee" }, { value: "12349876" }, { value: "masonlee@example.com" }],
        [{ value: "Isabella King" }, { value: "67890123" }, { value: "isabellaking@example.com" }],
        [{ value: "Ethan Scott" }, { value: "54321678" }, { value: "ethanscott@example.com" }],
        [{ value: "Ava Green" }, { value: "78901234" }, { value: "avagreen@example.com" }],
        [{ value: "Noah Hall" }, { value: "61234567" }, { value: "noahhall@example.com" }],
        [{ value: "Mia Adams" }, { value: "89012345" }, { value: "miaadams@example.com" }]
      ];
      
    const handleFileUpload = (files) => {
      setFiles(files);
      Papa.parse(files[0],{
        header:true,
        complete:(res)=>{
            console.log(res.data)
        }
      })
     
      
    };
  return (
    <div className=' h-screen p-4 md:ml-64  pt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
          {uplaod? <Spreadsheet className='w-full h-full' data={data} />:(<div className="w-full flex flex-col justify-center items-center max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />  
      {files.length!=0&&<button type="button" onClick={()=>{setupload(true)}} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submite Files</button>}
    </div>)}
    </div>
  )
}

export default Manage_Teacher