import React from 'react';
import { Button, Result } from 'antd';
import Nav from '../component/Nav';
import { Link } from 'react-router-dom';
const NotFound = () => (
  <div className='h-screen flex flex-col justify-center'>
  <Nav></Nav>
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to={"/home"}><Button type="primary">Back Home</Button></Link>}
  />
  </div>
);
export default NotFound;