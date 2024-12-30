import React from 'react'
import { useState } from 'react';
import { FileUpload } from '../dashcomp/FileUploadDemo';
import Papa from "papaparse"
import { Button } from 'antd';
import Spreadsheet from "react-spreadsheet";
function Manage_Teacher() {
    const [files, setFiles] = useState([]);
    let [uplaod,setupload]=useState(false)
   

    const handleFileUpload = (files) => {
      setFiles(files);
      
     
      
    };
  return (
      <div className=' h-screen p-4 md:ml-64  pt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
            {uplaod? <h1>f</h1>:(<div className="w-full flex flex-col justify-center items-center max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />  
        {files.length!=0&&<button type="button" onClick={()=>{setupload(true)}} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submite Files</button>}
      </div>)}
      </div>
  )
}

export default Manage_Teacher