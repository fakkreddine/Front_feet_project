import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {Badge, Card, Col, Row, Statistic } from 'antd';

function Stats(props) {
  return (
    <div className='w-full h-full'>
        <Card bordered={false}>
    <div className='flex justify-between'>
        <img className='w-10 h-10 object-contain' src={props.img}/>
        <h3 class=" ubuntu-medium text-sm font-normal lg:text-lg  dark:text-gray-400">{props.text}</h3>
    </div>
    <div className='flex justify-end'><p className=' text-gray-500 font-medium' style={{"color":"#192c4d"}} >5 User</p></div>
    
    <div className='flex '><Badge
        className="site-badge-count-109"
        count={"+3%"}
        style={{ backgroundColor: '#52c41a' }}
      /> <p className='mx-2  text-gray-500'>Than Last Week</p></div>
  </Card></div>
  )
}

export default Stats