import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {  useNavigate } from 'react-router-dom'
// import Home from './Home';
// import Login from './Login';
import './App.css';

import ProtectedRoute from './ProtectedRoute';
// import Checkout from './components/Checkout/Checkout';
import Dashboard from './components/Dashboard/Dashboard';
import LoginScreen from './components/LoginScreen/LoginScreen';
import TransferPage from './components/TransferPage/TransferPage';
import UserLogs from './components/UserLogs/UserLogs';
import Vehicles from './components/VehicleSelection/Vehicle';
import Transferring from './components/Transfering/Transfering';
import AdminLoginScreen from './components/AdminLoginScreen/AdminLoginScreen';

const App: React.FC = () => {
  //Variable which tells whether user is logged in or not
  const [loggedin, setLoggedin] = useState(false);

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* depending on the redirectTo Variable value it redirects to the corresponding page if user is not logged in */}
          <Route
            path="/"
            element={<ProtectedRoute isAuth={loggedin} redirectTo="/Login" />}
          >
            {/*should probably put stuff in here eventually, but ill leave it out for debugging*/}
          </Route>
          <Route
            path="/Login"
            element={<LoginScreen setLogin={setLoggedin} />}
          />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Transfer" element={<TransferPage />} />
          <Route path="/Transfering" element={<Transferring />} />
          <Route path="/UserLogs" element={<UserLogs />} />
          <Route path="/VehicleSelection" element={<Vehicles />} />
          <Route path="/AdminLogin" element={<AdminLoginScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
