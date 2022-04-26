import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components and assets
import Spinner from '../Spinner/Spinner';
import AsterixDisplay from '../AsterixDisplay/AsterixDisplay';
import NumPad from '../NumPad/NumPad';
import logo from '../../imgs/veggie-rescue-logo.png';

// import driver auth slice and vehicles for API calls
import { login, reset } from '../../features/driverAuth/driverAuthSlice';
import {
  getVehicle,
  reset as resetVehicle
} from '../../features/vehicles/VehiclesSlice'

type Props = {};

const LoginScreen: React.FC<Props> = () => {
  // Local state
  const [asterix, setAsterix] = useState<string[]>([]);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

// Setup navigation and services
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

// External state
  const {
    driver,
    isError: driverError,
    isSuccess: driverSuccess,
    message: driverMessage
  } = useAppSelector((state) => state.driverAuth);
 
  const {
    vehicle,
    isError: vehicleError,
    isSuccess: vehicleSuccess,
    message: vehicleMessage
  } = useAppSelector((state) => state.vehicle);

  // On component load
  useEffect(() => {
    // If we have a driver in local storage (initial state) or dispatching login puts one there:
    if ((driverSuccess || Object.keys(driver).length !== 0) && !vehicleError && !vehicleSuccess) {
      // Dispatch to get vehicle associated with this current driver
      dispatch(getVehicle());
      setLoading(true);
    }

    // We must check if vehicleSuccess returns true (means API call found vehicle associated with driver)
    if ((Object.keys(vehicle).length !== 0) && vehicleSuccess) {
      setLoading(false);
      dispatch(resetVehicle())
      toast.success(`Welcome ${driver.name}`);
      toast.success(`You are current driving : ${vehicle.name}`);

      // NOW depending on if there is currently weight in the vehicle or not we either go to Dashboard or Transfer page
      if (vehicle.totalWeight !== 0) {
        navigate('/Transfer');
      } else {
        navigate('/Dashboard');
      }
    }

    // We must check if vehicleError returns error
    if (vehicleError) {
      setLoading(false);
      toast.success(`Welcome ${driver.name}`);
      dispatch(resetVehicle())
      navigate('/Vehicles');
    }

    // Once user enters 4 numbers, dispatch API call for logging in and immediately clear asterix display
    if (pin.length === 4) {
      setLoading(true);
      dispatch(login(pin));
      clearHandler();
    }

    // Display toast if we have an error with driver login
    if (driverError) {
      toast.error(driverMessage);
      setLoading(false);
      //reset state in case we had an error and none of the if statements were reached
      dispatch(reset());     
    }
  }, [vehicleSuccess, vehicleError, driver, driverError, driverSuccess, driverMessage, navigate, pin, dispatch, vehicle.name, vehicle.totalWeight, vehicleMessage, vehicle]);

  // Takes care of asterix in pin display
  const buttonHandler = (btnId: string) => {
    if (pin.length <= 3) {
      setPin(pin + btnId);
      setAsterix([...asterix, '*']);
    }
  };

  // Clears on reset or > 4
  const clearHandler = () => {
    setPin('');
    setAsterix([]);
  };

  // Erases 1 per backspace click
  const backSpaceHandler = () => {
    setPin(pin.slice(0, -1));
    setAsterix((a) => a.filter((_, i) => i !== a.length - 1));
  };

  if (loading) {
    return <Spinner />;
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