import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/driverAuth/driverAuthSlice';

import AsterixDisplay from '../AsterixDisplay/AsterixDisplay';
import NumPad from '../NumPad/NumPad';
import logo from '../../imgs/veggie-rescue-logo.png';

import { useNavigate } from 'react-router-dom';

type Props = {};

const LoginScreen: React.FC<Props> = () => {
  const [asterix, setAsterix] = useState<string[]>([]);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { driver, isError, isSuccess, message } = useAppSelector(
    (state) => state.driverAuth
  );
  useEffect(() => {
    // Once user enters 4 numbers, dispatch API call for logging in and immediately clear asterix display
    if (pin.length === 4) {
      setLoading(true);
      dispatch(login(pin));
      clearHandler();
    }
    // Display toast if we have an error with driver login
    if (isError) {
      toast.error(message);
      //reset state in case we had an error and none of the if statements were reached
      dispatch(reset());
      setLoading(false);
    }
    // If we have a successful call then use the driver data to get vehicles, we also check if the user was saved in localStorage
    if (isSuccess || Object.keys(driver).length !== 0) {
      toast.success(`Welcome ${driver.name}`);
      navigate('/Dashboard');
      setLoading(false);
    }
    if (Object.keys(driver).length === 0) {
      setLoading(false);
    }
  }, [driver, isError, isSuccess, message, navigate, pin, dispatch]);

  const buttonHandler = (btnId: string) => {
    if (pin.length <= 3) {
      setPin(pin + btnId);
      setAsterix([...asterix, '*']);
    }
  };

  const clearHandler = () => {
    setPin('');
    setAsterix([]);
  };

  const backSpaceHandler = () => {
    setPin(pin.slice(0, -1));
    setAsterix((a) => a.filter((_, i) => i !== a.length - 1));
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <div className=" mt-5 mb-3 w-4/6 ">
          <img src={logo} alt="veggie rescue logo" />
        </div>
        <span>Enter your 4 digit pin</span>
        <AsterixDisplay asterix={asterix} />
      </div>
      <NumPad
        buttonHandler={buttonHandler}
        clearHandler={clearHandler}
        backSpaceHandler={backSpaceHandler}
      />
    </div>
  );
};

export default LoginScreen;
