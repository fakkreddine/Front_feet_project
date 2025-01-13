import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./Auth/AuthContext";
import Login from './layout/Login';
import Signup from './layout/Signup';
import ProtectRoute from "./Auth/ProtectRoute";
import UserHome from './layout/UserHome';
import Home from "./layout/home/Home";
import Teacher from './layout/dashboardLayout/Teacher';
import Groups from './layout/dashboardLayout/Groups';
import Rooms from './layout/dashboardLayout/Rooms';
import Scheduale from './layout/dashboardLayout/Scheduale';
import Dash from './component/Dash';

import Aside from './component/Aside';
import DepartmentPage from './layout/DepartmentPage';

import NotFound from './layout/NotFound';
import Nav from './component/Nav';
import ManageGroup from './component/Groupcomponent/ManageGroup'; // Import ManageGroup component
import Student from './layout/StudentLayout/Student';
import TeacherDash from './layout/dashboardTeacher/TeacherDash';
import Subject from './layout/subjects/Subject';
import Init from './component/Init';
import StudentDash from "./layout/dashboardStudent/StudentDash";
import 'flowbite';
import SuperAdminDash from "./component/SuperAdminDash";
import SessionAdmin from "./component/SessionAdmin";
import UsersTable from "./component/UsersTable";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Init />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notfound" element={<NotFound />} />

              {/* user home  */}
            <Route path="/home" element={<ProtectRoute allowedRoles={['Admin','Teacher','SuperAdmin','Student']} ><Home /></ProtectRoute>} />


            {/* admin dash */}

            <Route path='/dash' element={<ProtectRoute allowedRoles={['Admin']} ><UserHome /><Dash /></ProtectRoute>} />
            <Route path='/dash/schedule' element={<ProtectRoute allowedRoles={['Admin']}><UserHome /><Scheduale /></ProtectRoute>} />
            <Route path='/dash/teachers' element={<ProtectRoute allowedRoles={['Admin']} ><UserHome /><Teacher /></ProtectRoute>} />
            <Route path="/dash/departments" element={<ProtectRoute allowedRoles={['Admin']} ><DepartmentPage /></ProtectRoute>} />
            <Route path="/dash/teachers" element={<ProtectRoute allowedRoles={['Admin']} ><Teacher /></ProtectRoute>} />
            <Route path="/dash/students" element={<ProtectRoute allowedRoles={['Admin']} > <UserHome />   <Student /></ProtectRoute>} />
            <Route path="/dash/rooms" element={<ProtectRoute allowedRoles={['Admin']} ><Rooms /></ProtectRoute>} />
            <Route path="/dash/schedule" element={<ProtectRoute allowedRoles={['Admin']} ><Scheduale /></ProtectRoute>} />
            <Route path="/dash/subjects" element={<ProtectRoute allowedRoles={['Admin']} > <Subject></Subject></ProtectRoute>}></Route>

            <Route path="/dash/groups" element={<ProtectRoute allowedRoles={['Admin']} ><Groups /></ProtectRoute>} />
            <Route path="/dash/groups/:groupId" element={<ProtectRoute allowedRoles={['Admin']} ><ManageGroup /></ProtectRoute>} /> {/* New Route */}


             {/* admin dash */}
            <Route path="/Superadmindash" element={<ProtectRoute allowedRoles={['SuperAdmin']} > <SuperAdminDash></SuperAdminDash></ProtectRoute>}></Route>
            <Route path="/SessionAdmin" element={<ProtectRoute allowedRoles={['SuperAdmin']}> <SessionAdmin></SessionAdmin></ProtectRoute>}></Route>
            <Route path="/UsersTable" element={<ProtectRoute allowedRoles={['SuperAdmin']}> <UsersTable></UsersTable></ProtectRoute>}></Route>



            <Route path="/TeacherDashboard" element={<ProtectRoute allowedRoles={['Teacher']}> <TeacherDash></TeacherDash></ProtectRoute>}></Route>


            <Route path="/StudentDashboard" element={<ProtectRoute allowedRoles={['Student']}> <StudentDash></StudentDash></ProtectRoute>}></Route>
           


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
