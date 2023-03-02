import axios from 'axios';

const API_URL = '/api/drivers/';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

interface DriverData {
  _id: string;
  name: string;
  // email: string;
  pin: string;
}

// Register driver
const register = async (driverData: DriverData) => {
  const response = await axios.post(SERVER_URL + API_URL, driverData);

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
  const response = await axios.post(`${SERVER_URL + API_URL}login`, driverData);
  if (response.data) {
    localStorage.setItem('driver', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout driver
const logout = () => localStorage.removeItem('driver');

//  Gets ALL drivers ( Can be driver or admin to use this )
const getDrivers = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(SERVER_URL + API_URL, config);
  return response.data;
};

// //  Create new driver (For admin only)
const createDriver = async (driverData: DriverData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(SERVER_URL + API_URL, driverData, config);
  return response.data;
};

// get driver only using driverId (For Driver only)
const getDriver = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${SERVER_URL + API_URL}match`, config);
  return response.data[0];
};

// update a driver given its id as a parameter... can be admin or driver
const updateDriver = async (driverData: DriverData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // using rest operator to take just the id out.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = driverData;

  const response = await axios.put(
    SERVER_URL + API_URL + _id,
    {
      ...rest
    },
    config
  );
  return response.data;
};

// delete a driver given its id as a parameter... can be admin
const deleteDriver = async (driverID: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(SERVER_URL + API_URL + driverID, config);
  return response.data;
};

const driverAuthService = {
  register,
  logout,
  login,
  getDrivers,
  createDriver,
  getDriver,
  updateDriver,
  deleteDriver
};

export default driverAuthService;
