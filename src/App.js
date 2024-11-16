import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./Auth/AuthContext";
import Login from './layout/Login';

import Signup from './layout/Signup';
import ProtectRoute from "./Auth/ProtectRoute";
import UserHome from './layout/UserHome';
import Home from "./layout/home/Home"

import Teacher from './layout/dashboardLayout/Teacher';

import Dash from './component/Dash';

 
import Aside from './component/Aside';



import DepartmentPage from './layout/DepartmentPage'; 
import SchedulePage from './layout/SchedulePage';

function App() {
  return (
    <div className="App">
     

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            
            
            
          
        <Route path='/dash' element={<ProtectRoute><UserHome></UserHome><Dash></Dash></ProtectRoute> }/>


        <Route path='/dash/schedule' element={<ProtectRoute> <UserHome></UserHome><SchedulePage></SchedulePage> </ProtectRoute> }/>
        
       


        <Route path='/dash/teachers' element={<ProtectRoute> <UserHome></UserHome><Teacher></Teacher>  </ProtectRoute> }/>
            <Route path="/dash/departments" element={<ProtectRoute><DepartmentPage /></ProtectRoute>} />  

            
            <Route path="/dash" element={<ProtectRoute><UserHome /></ProtectRoute>} />
            <Route path="/dash/teachers" element={<ProtectRoute><Teacher/></ProtectRoute>} />
            <Route path="/dash/students" element={<ProtectRoute><Teacher/></ProtectRoute>} />
            <Route path="/dash/departments" element={<ProtectRoute><DepartmentPage /></ProtectRoute>} />
            <Route path="/dash/schedule" element={<ProtectRoute><SchedulePage /></ProtectRoute>} />
            <Route path="/home" element={<ProtectRoute><Home></Home></ProtectRoute>} />
           
          </Routes>
        </BrowserRouter>
      </AuthProvider>



        
        
      
      
   

    </div>
  );
}

export default App;
