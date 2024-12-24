import React, { useState } from 'react'
import UserHome from '../UserHome'
import Tree from '../../component/Student/Treecomp'
import Aside_v2 from '../../component/Aside_v2'
import { Button, Result } from 'antd';
import { use } from 'react';
import { Breadcrumb } from "antd";

function Student() {
  let [selected,setselected]=useState(null)
  let changeSelection=(id)=>{
    setselected(id)
    console.log(id);

  }


  return (
    
    <div className=' h-screen w-screen'>
      <Aside_v2></Aside_v2>
      <div className=' mt-15 pt-14 ml-24 transition-all duration-300 peer-hover:ml-64 flex h-screen'>

    <Tree selected={changeSelection}></Tree>
    <div className='w-full'>
    {!selected?(<Result
    status="404"
    title="No Data"
    subTitle="Select a Group to load Data "
    extra={<Button type="primary">Back Home</Button>}
  />):
  (<Result
    status="404"
    title="No Data"
    subTitle="Select a Group to load Data "
    extra={<Button type="primary">Back Home</Button>}
  />)
    }
    </div>
    

</div>
    </div>
    
    
    
  )
}

export default Student