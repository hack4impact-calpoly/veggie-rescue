import { useState, useEffect } from 'react';
import Digits from './Digits';
import './LoginScreen.css';
import NumPad from './NumPad';
import logo from './assets/veggie-rescue.png';
import DriverData from './assets/DriverData';

function LoginScreen() {
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
    }
  }, [driver]);

  //on numpad submit check to see if driver exists; if so add to driver state
  const submitHandler = () => {
    if (pin.length === 4) {
      const driverFilter = DriverData.filter((d) => d.pin === pin);
      if (driverFilter.length !== 0) {
        setDriver(driverFilter[0]);
        // here we will navigate to next page
      }
    }
    setPin('');
    setAsterix([]);
  };

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

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="veggie rescue logo" />
      </div>
      <span style={{ fontFamily: 'Roboto' }}>Enter your 4 digit pin</span>
      <Digits asterix={asterix} />
      <NumPad
        buttonHandler={buttonHandler}
        submitHandler={submitHandler}
        clearHandler={clearHandler}
      />
    </div>
  );
}

export default LoginScreen;
