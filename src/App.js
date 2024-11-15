import logo from './logo.svg';
import './App.css';
import Login from './layout/Login';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import {AuthProvider} from "./Auth/AuthContext"
import Home from './layout/Home';
import Signup from './layout/Signup';
import  ProtectRoute from "./Auth/ProtectRoute"
import UserHome from './layout/UserHome';
import Teacher from './layout/dashboardLayout/Teacher';

import Dash from './component/Dash';

function App() {
  return (
   
    <div className="App">
       <AuthProvider>
      <BrowserRouter>
     
      <Routes>
        <Route path="/login" element={<Login ></Login>}/>
        <Route path="/signup" element={<Signup></Signup>}/>
        <Route path="/home" element={<ProtectRoute><Home></Home></ProtectRoute> }/>
        <Route path='/dash' element={<ProtectRoute><UserHome></UserHome><Dash></Dash></ProtectRoute> }/>
        <Route path='/dash/teacher' element={<ProtectRoute> <UserHome></UserHome><Teacher></Teacher>  </ProtectRoute> }/>
        
       


        
        
      
      </Routes>
      
    </BrowserRouter>
    </AuthProvider> 
    </div>
  );
}

export default App;
