import React, { useState, useEffect } from 'react';
import AsterixDisplay from '../AsterixDisplay/AsterixDisplay';
import NumPad from '../NumPad/NumPad';
import logo from '../../imgs/veggie-rescue-logo.png';

import { useNavigate } from 'react-router-dom';

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen: React.FC<Props> = ({setLogin}) =>{
  const [asterix, setAsterix] = useState<string[]>([]);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState({
    id: '',
    name: '',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: ''
  });
  const navigate = useNavigate();


  useEffect(() => {
    //on component load, set loading; fetch driver data and put into state
    if (driver.name !== '') {
      alert(`Found driver:${driver.name}`);
      setDriver({
        id: '',
        name: '',
        isLoggedIn: false,
        clock_in: '',
        clock_out: '',
        pin: ''
      });
    }
    if (pin.length === 4) {
      const driverFilter = DriverData.filter((d) => d.pin === pin);
      if (driverFilter.length !== 0) {
        setDriver(driverFilter[0]);
        setLogin(true);
        navigate('/VehicleSelection');
      }else{
        alert('No driver found... hint: try 1111 or 2222 or 3333!')
      }
      clearHandler();
     
    }
  }, [driver,pin]);


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

  const backSpaceHandler = () =>{
    setPin(pin.slice(0,-1));
    setAsterix(a => a.filter((_, i) => i !== a.length -1));
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
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
  </>
  );
}

export default LoginScreen;

//below will be deleted once we implement API calls
interface drivers {
  id: string;
  name: string;
  isLoggedIn: boolean;
  clock_in: string;
  clock_out: string;
  pin: string;
}

const DriverData: drivers[] = [
  {
    id: '1',
    name: 'diana',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: '1111'
  },
  {
    id: '1',
    name: 'carl',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: '2222'
  },
  {
    id: '1',
    name: 'maggie',
    isLoggedIn: false,
    clock_in: '',
    clock_out: '',
    pin: '3333'
  }
];