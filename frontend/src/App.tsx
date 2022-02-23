import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ProtectedRoute from './ProtectedRoute';
// import Checkout from './components/Checkout/Checkout';
import Dashboard from './components/Dashboard/Dashboard';
import LoginScreen from './components/LoginScreen/LoginScreen';
import TransferPage from './components/TransferPage/TransferPage';
import UserLogs from './components/UserLogs/UserLogs';
import Vehicles from './components/VehicleSelection/Vehicle';
import AdminLoginScreen from './components/AdminLoginScreen/AdminLoginScreen';
import TripLog from './components/TripLog/TripLog';
import Admin from './components/Admin/Admin';
const App: React.FC = () => {
  //Variable which tells whether user is logged in or not
  const [loggedin, setLoggedin] = useState(false);

  return (
    <>      
    <Router>
      <Routes>
        {/* depending on the redirectTo Variable value it redirects to the corresponding page if user is not logged in */}
            <Route path="/Login" element={<LoginScreen />} />
            <Route path="/" element={<LoginScreen />} />
            <Route path="/AdminLogin" element={<AdminLoginScreen />} />
{/* Below are protected routes which are only accessed after driver is logged in */}
            <Route
              path="/Dashboard"
              element={<ProtectedRoute redirectTo="/Login" />}
            >
              <Route path="/Dashboard" element={<Dashboard />} />
            </Route>
            <Route
              path="/VehicleSelection"
              element={<ProtectedRoute redirectTo="/Login" />}
            >
              <Route path="/VehicleSelection" element={<Vehicles />} />
            </Route>
            <Route
              path="/Transfer"
              element={<ProtectedRoute redirectTo="/Login" />}
            >
              <Route path="/Transfer" element={<TransferPage />} />
            </Route>
            <Route
              path="/UserLogs"
              element={<ProtectedRoute redirectTo="/Login" />}
            >
              <Route path="/UserLogs" element={<UserLogs />} />
            </Route>
            <Route
              path="/Admin"
              element={<ProtectedRoute redirectTo="/AdminLogin" />}
            >
              <Route path="/Admin" element={<Admin />} />
            </Route>

      </Routes>
      
    </Router>
        <ToastContainer />

    </>
  );
};

export default App;


        // <Route path="/Login" element={<LoginScreen />} />
        // <Route path="/Dashboard" element={<Dashboard />} />
        // <Route path="/Transfer" element={<TransferPage />} />
        // <Route path="/UserLogs" element={<UserLogs />} />
        // <Route path="/VehicleSelection" element={<Vehicles />} />
        // <Route path="/Admin" element={<Admin />} />
        // <Route path="/AdminLogin" element={<AdminLoginScreen />} />