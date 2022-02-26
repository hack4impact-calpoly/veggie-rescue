import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import {  useNavigate } from 'react-router-dom'
// import Home from './Home';
// import Login from './Login';
import './App.css';

import ProtectedRoute from './ProtectedRoute';
// import Checkout from './components/Checkout/Checkout';
import Dashboard from './components/Dashboard/Dashboard';
import LoginScreen from './components/LoginScreen/LoginScreen';
import TransferPage from './components/TransferPage/TransferPage';
import VehicleSelection from './components/VehicleSelection/VehicleSelection';
import Logs from './components/Logs/Logs';

const App: React.FC = () =>{
  //Variable which tells whether user is logged in or not 
  const [loggedin, setLoggedin] = useState(false);
  
  return (
    <Router>
    <div className='container'>    
      <Routes>
          {/* depending on the redirectTo Variable value it redirects to the corresponding page if user is not logged in */}
          <Route  path='/' element={<ProtectedRoute isAuth={loggedin}  redirectTo='/Login'/>}>
            {/*should probably put stuff in here eventually, but ill leave it out for debugging*/}
          </Route>        
          <Route path='/Login' element={<LoginScreen setLogin={setLoggedin}/>} />
            <Route path='/Dashboard' element={<Dashboard/>} />
            <Route path='/Transfer' element={<TransferPage/>} />
            <Route path='/VehicleSelection' element={<VehicleSelection/>} />
            <Route path='/YourLogs' element={<Logs />} />
          
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;