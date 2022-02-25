import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {  useNavigate } from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import Checkout from './Checkout';

import Weight from './components/Weight/Weight';

const App: React.FC = () =>{
  //Variable which tells whether user is logged in or not 
  const [loggedin, setLoggedin] = useState(false);
  
  return (
    <Router>
    <div >    
      <Routes>
          {/* depending on the redirectTo Variable value it redirects to the corresponding page if user is not logged in */}
          <Route  path='/' element={<ProtectedRoute isAuth={loggedin}  redirectTo="/login"/>}>
            <Route  path='/' element={<Home/>}/>
          </Route>        
          <Route path='/login' element={<Login/>}/> 
          <Route path='/Checkout' element={<Checkout/>}/>           
          <Route path='/Weight' element={<Weight/>}/>           
          
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;