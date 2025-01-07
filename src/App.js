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
import Dash from './component/Dash';
import Aside from './component/Aside';
import DepartmentPage from './layout/DepartmentPage';
import SchedulePage from './layout/SchedulePage';
import NotFound from './layout/NotFound';
import Nav from './component/Nav';
import ManageGroup from './component/Groupcomponent/ManageGroup'; // Import ManageGroup component
import Student from './layout/StudentLayout/Student';
import TeacherDash from './layout/dashboardTeacher/TeacherDash';
import Subject from './layout/subjects/Subject';
import Init from './component/Init';
import StudentDash from "./layout/dashboardStudent/StudentDash";

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

            {/* ProtectRoute wrapper added for secure routes */}
            <Route path='/dash' element={<ProtectRoute><UserHome /><Dash /></ProtectRoute>} />
            <Route path='/dash/schedule' element={<ProtectRoute><UserHome /><SchedulePage /></ProtectRoute>} />
            <Route path='/dash/teachers' element={<ProtectRoute><UserHome /><Teacher /></ProtectRoute>} />
            <Route path="/dash/departments" element={<ProtectRoute><DepartmentPage /></ProtectRoute>} />
            <Route path="/dash" element={<ProtectRoute><UserHome /></ProtectRoute>} />
            <Route path="/dash/teachers" element={<ProtectRoute><Teacher /></ProtectRoute>} />
            <Route path="/dash/students" element={<ProtectRoute> <UserHome />   <Student /></ProtectRoute>} />
            <Route path="/dash/rooms" element={<ProtectRoute><Rooms /></ProtectRoute>} />
            <Route path="/dash/schedule" element={<ProtectRoute><SchedulePage /></ProtectRoute>} />
            <Route path="/home" element={<ProtectRoute><Home /></ProtectRoute>} />

            {/* Route for managing groups */}
            <Route path="/dash/groups" element={<ProtectRoute><Groups /></ProtectRoute>} />
            <Route path="/dash/groups/:groupId" element={<ProtectRoute><ManageGroup /></ProtectRoute>} /> {/* New Route */}



            <Route path="/TeacherDashboard" element={<ProtectRoute> <TeacherDash></TeacherDash></ProtectRoute>}></Route>
            <Route path="/StudentDashboard" element={<ProtectRoute> <StudentDash></StudentDash></ProtectRoute>}></Route>
            <Route path="/dash/subjects" element={<ProtectRoute> <Subject></Subject></ProtectRoute>}></Route>


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
