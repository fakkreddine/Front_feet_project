  import React from 'react'

import "../css/loder.css"
  import { useAuth } from './AuthContext';
  import Login from '../layout/Login';
  function ProtectRoute({ children}) {

      let {user,auth,Loding} =useAuth() ;
      const loder=()=>{
  if (Loding) {
  
    return (<div className='cont'  >
      <div className='loader'></div>
    </div>)
    
  }else{
    return user?children:<Login></Login>
  }

      }
      
    return (
    <>
    {(loder())}
    </>
      
    ) ;
  }

  export default ProtectRoute