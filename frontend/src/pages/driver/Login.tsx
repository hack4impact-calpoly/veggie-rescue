import { useState, useEffect } from 'react';
import AsterixDisplay from '../../components/AsterixDisplay/AsterixDisplay'

import NumPad from '../../components/NumPad/NumPad'
import logo from '../../imgs/veggie-rescue-logo.png';

function Login() {
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
        // here we will navigate to next page
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
    <div className="container">
      <div className="w-4/6 pt-16 pb-10">
        <img src={logo} alt="veggie rescue logo" />
      </div>
      <span >Enter your 4 digit pin</span>
      <AsterixDisplay asterix={asterix} />
      <NumPad
        buttonHandler={buttonHandler}
        clearHandler={clearHandler}
        backSpaceHandler={backSpaceHandler}
      />
    </div>
  );
}

export default Login;

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