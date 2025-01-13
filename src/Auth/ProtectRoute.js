import React, { useEffect, useState } from 'react';
import "../css/loder.css";
import { useAuth } from './AuthContext';
import Login from '../layout/Login';
import { Navigate } from 'react-router-dom';

function ProtectRoute({ children,allowedRoles }) {
  const { user, auth, Loding,userDetails } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!Loding) {
      setIsLoaded(true); // Set to true once loading is complete
    }
  }, [Loding]);

  const loader = () => {
    if (Loding || !isLoaded) {
      return (
        <div className="cont">
          <div className="loader"></div>
        </div>
      );
    } else {


      if (user){
console.log("role",userDetails)
      if(allowedRoles.includes(userDetails.roleUser)){
        return children
      }else{
        return  <Navigate to={"/notfound"}/> 
        
      }



      
        
      }else{
        
         <Navigate to={"/login"}/>
         return 
      }
      
    }
  };

  return <>{loader()}</>;
}

export default ProtectRoute;
