import React from 'react';
import './AdminLoginScreen.css';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import logo from '../../imgs/veggie-rescue-logo.png';

const AdminLoginScreen = () => {
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

 const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
   setEmail(e.currentTarget.value);
 };

 const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
   setPassword(e.currentTarget.value);
 };

  const handleSubmit = () => {
    if (email === "" || password === "") {
      alert("Incorrect email or password. Please try again.");
    }
    else {
      console.log({email});
      console.log({password});
    }
  };

  return(
    <div className="container">
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
