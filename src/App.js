import logo from './logo.svg';
import './App.css';
import Login from './layout/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./Auth/AuthContext";
import Home from './layout/Home';
import Signup from './layout/Signup';
import ProtectRoute from "./Auth/ProtectRoute";
import UserHome from './layout/UserHome';
import TeacherPage from './layout/TeacherPage'; 
import Aside from './component/Aside';
import DepartmentPage from './layout/DepartmentPage'; 


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<ProtectRoute><Home /></ProtectRoute>} />
            <Route path="/dash" element={<ProtectRoute><UserHome /></ProtectRoute>} />
            <Route path="/teachers" element={<ProtectRoute><TeacherPage /></ProtectRoute>} />
            <Route path="/students" element={<ProtectRoute><TeacherPage /></ProtectRoute>} />
            <Route path="/departments" element={<ProtectRoute><DepartmentPage /></ProtectRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
