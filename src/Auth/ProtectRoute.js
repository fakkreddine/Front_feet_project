import React, { useEffect, useState } from 'react';
import "../css/loder.css";
import { useAuth } from './AuthContext';
import Login from '../layout/Login';

function ProtectRoute({ children }) {
  const { user, auth, Loding } = useAuth();
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
      return user ? children : <Login />;
    }
  };

  return <>{loader()}</>;
}

export default ProtectRoute;
