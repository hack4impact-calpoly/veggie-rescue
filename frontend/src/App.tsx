import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import LoginScreen from './components/LoginScreen/LoginScreen';
import TransferPage from './components/TransferPage/TransferPage';
import Vehicles from './components/VehicleSelection/Vehicle';
import AdminLoginScreen from './components/AdminLoginScreen/AdminLoginScreen';
import Admin from './components/Admin/Admin';
import Logs from './components/Logs/Logs';
import Transfering from './components/Transfering/Transfering';
import Weight from './components/Weight/Weight';

import NewLogWrapper from './components/NewLogWrapper/NewLogWrapper';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* (Unprotected routes) depending on the redirectTo Variable value it redirects to the corresponding page if user is not logged in */}
          <Route path="/Login" element={<LoginScreen />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/AdminLogin" element={<AdminLoginScreen />} />

          {/* (Protected Routes) Below are protected routes which are only accessed after driver is logged in */}
          <Route
            path="/Dashboard"
            element={<ProtectedRoute redirectTo="/Login" />}
          >
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
          <Route
            path="/Vehicles"
            element={<ProtectedRoute redirectTo="/Login" />}
          >
            <Route path="/Vehicles" element={<Vehicles />} />
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
            <Route path="/UserLogs" element={<Logs />} />
          </Route>
          <Route
            path="/Transfer"
            element={<ProtectedRoute redirectTo="/Login" />}
          >
            <Route path="/Transfer" element={<Transfering />} />
          </Route>
          <Route
            path="/TransferPage"
            element={<ProtectedRoute redirectTo="/Login" />}
          >
            <Route path="/TransferPage" element={<TransferPage />} />
          </Route>
          <Route
            path="/Weight"
            element={<ProtectedRoute redirectTo="/Login" />}
          >
            <Route path="/Weight" element={<Weight />} />
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
