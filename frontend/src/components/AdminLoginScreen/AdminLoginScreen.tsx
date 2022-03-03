import React from 'react';
// import './AdminLoginScreen.css';
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
    
    <div className="bg-[url('imgs/carrot-background.png')] font-Poppins w-full h-screen relative flex items-center justify-center flex-col">
      <div className="bg-white w-[460px] h-[525px] rounded-[15px] shadow-[0_2px_20px_2px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
        <div className="w-[350px] pt-[0px] pb-[15px]">
          <img src={logo} alt="veggie rescue logo" />
        </div>
        <div className="border-t-[4px] border-solid border-[#FF9C55] w-[350px] flex items-center justify-center">
          <h4 className='text-xs text-gray-700 mt-2'>
            Sign in and start managing Veggie Rescue logs
          </h4>
        </div>

        <div className="rounded-10 flex items-center justify-center flex-col mt-5">
        <div className="rounded-[30px] h-[55px]">
            <input
              className="h-[35px] rounded-[30px] w-[18.75rem] border-2 border-solid border-[#929292] p-[3px] pl-[30px]"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="rounded-[30px] h-[55px]">
            <input
              className="h-[35px] rounded-[30px] w-[18.75rem] border-2 border-solid border-[#929292] p-[3px] pl-[30px]"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="rounded-[30px] h-[55px]">
            <button type="submit" className="rounded-[30px] w-[335px] border-none bg-orange-400 text-white h-12 flex items-center justify-center" onClick={handleSubmit}>
              <h3>Login</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
