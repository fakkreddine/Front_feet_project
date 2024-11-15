import React from 'react'
import { useState } from 'react';
import { FileUpload } from '../dashcomp/FileUploadDemo';
function Manage_Teacher() {
    const [files, setFiles] = useState([]);
    const handleFileUpload = (files) => {
      setFiles(files);
      console.log(files);
    };
  return (
    <div className=' h-screen p-4 md:ml-64  pt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
    </div>
  )
}

export default Manage_Teacher