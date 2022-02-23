import React from 'react';
import './AdminLoginScreen.css';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import logo from '../../imgs/veggie-rescue-logo.png';

const AdminLoginScreen = () => {
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const validateEmail = () => {
    let res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(email);
  }

  const handleSubmit = () => {
    if (email === "" || password === "") {
      alert("Missing email or password. Please try again.");
    }
   else if(!validateEmail()){
       alert("Please enter a valid email address.");
   }
    else {
      console.log({email});
      console.log({password});
    }
  };

  return(
    <div className="container2">
      <div className="text-box">
        <div className="logo">
          <img className='logo' src={logo} alt="veggie rescue logo" />
        </div>

        <div className="instructions">
          <h4>Sign in and start managing Veggie Rescue logs</h4>
        </div>

        <div className="inputs">
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="input-box">
            <button type="submit" className="submit" onClick={handleSubmit}>
              <h3>Login</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
