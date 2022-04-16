import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';
import {
  getVehicles,
  getVehicle,
  reset as resetDriver
} from '../../features/vehicles/vehicleSlice';
import { login, reset } from '../../features/driverAuth/driverAuthSlice';

import AsterixDisplay from '../AsterixDisplay/AsterixDisplay';
import NumPad from '../NumPad/NumPad';
import logo from '../../imgs/veggie-rescue-logo.png';

import { useNavigate } from 'react-router-dom';

type Props = {};

const LoginScreen: React.FC<Props> = () => {
  const [asterix, setAsterix] = useState<string[]>([]);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    driver,
    isError: driverError,
    isSuccess: driverSuccess,
    message: driverMessage
  } = useAppSelector((state) => state.driverAuth);
  const {
    vehicles,
    vehicle,
    isError: vehicleError,
    isSuccess: vehicleSuccess,
    message: vehicleMessage
  } = useAppSelector((state) => state.vehicle);

  useEffect(() => {
    
    // If we have a driver in local storage (initial state) or dispatching login puts one there:
    if (driverSuccess || Object.keys(driver).length !== 0) {
      // Dispatch to get vehicle associated with this current driver
      dispatch(getVehicle());
    }
    // We must check if vehicleSuccess returns true (means API call found vehicle associated with driver)
    if ((driverSuccess || Object.keys(driver).length !== 0) && vehicleSuccess) {
      toast.success(`Welcome ${driver.name}`);
      toast.success(`You are current driving a : ${vehicle.name}`);
      // NOW depending on if there is currently weight in the vehicle or not we either go to Dashboard or Transfer page
      if (vehicle.totalWeight !== 0) {
        toast.error('Navigating to transfer weight page');
        navigate('/Transfer');
      } else {
        toast.success('Navigating to dashboard... weight of vehicle is at 0');
        navigate('/Dashboard');
      }
      
    }

    // We must check if vehicleError returns error
    if ((driverSuccess || Object.keys(driver).length !== 0) && vehicleError) {
      toast.success(`Welcome ${driver.name}`);
      toast.error(
        'You are not logged in with vehicle sending you to choose one'
      );
      toast.error(vehicleMessage);
      navigate('/Vehicles');
    }

    // Once user enters 4 numbers, dispatch API call for logging in and immediately clear asterix display
    if (pin.length === 4) {
      //setLoading(true);
      dispatch(login(pin));
      clearHandler();
    }

    // Display toast if we have an error with driver login
    if (driverError) {
      toast.error(driverMessage);
      //reset state in case we had an error and none of the if statements were reached
      dispatch(reset());
      setLoading(false);
    }
    /*

    if (Object.keys(driver).length === 0) {
      setLoading(false);
    }
    */
  }, [
    vehicleSuccess,
    vehicleError,
    driver,
    driverError,
    driverSuccess,
    driverMessage,
    navigate,
    pin,
    dispatch
  ]);

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
