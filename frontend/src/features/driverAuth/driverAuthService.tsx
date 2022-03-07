import axios from 'axios';
const API_URL = '/api/drivers/';

interface DriverData {
  name: string;
  email: string;
  pin: string;
}

// Register driver
const register = async (driverData: DriverData) => {
  const response = await axios.post(API_URL, driverData);

  if (response.data) {
    localStorage.setItem('driver', JSON.stringify(response.data));
  }
  return response.data;
};

// Login driver
const login = async (pin: string) => {
  const driverData = {
    pin
  };
  const response = await axios.post(API_URL + 'login', driverData);
  if (response.data) {
    localStorage.setItem('driver', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout driver
const logout = () => localStorage.removeItem('driver');

const driverAuthService = {
  register,
  logout,
  login
};

export default driverAuthService;