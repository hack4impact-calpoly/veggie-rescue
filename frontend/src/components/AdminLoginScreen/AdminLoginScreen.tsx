import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { login, reset } from '../../features/adminAuth/adminAuthSlice';

import Admin from '../Admin/Admin';
import './AdminLoginScreen.css';
import logo from '../../imgs/veggie-rescue-logo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLoginScreen = () => {
  // const [email, setEmail] = useState("");
  // const[password, setPassword] = useState("");
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
    const { email, password } = formData;
    // const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const { admin, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.adminAuth
  )

    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
      if(isSuccess || Object.keys(admin).length !== 0){
        toast.success(`Success!  Welcome ${admin.name}`)
       navigate('/Admin')
      }
      dispatch(reset())
  },[isError, isSuccess, admin, message, navigate, dispatch])

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const validateEmail = () => {
    let res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(email);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
      const userData = {
      email,
      password,
    }
    if (email === "" || password === "") {
             toast.error("Missing email or password. Please try again.");

    }
   else if(!validateEmail()){
       toast.error("Please enter a valid email address.");
   }
    else {
      dispatch(login(userData))
  
    }
  };



if(isLoading){
  return <h1> Loading... </h1>
}
  return(
    <div className="container2">
      <div className="text-box">
        <div className="logo">
          <img className='logo' src={logo} alt="veggie rescue logo" />
        </div>

        <div className="instructions">
          <h4>Sign in and start managing Veggie Rescue logs</h4>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="input-box">
            <button className="submit" >
              <h3>Login</h3>
            </button>
          </div>
         
        </div>
         </form>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
