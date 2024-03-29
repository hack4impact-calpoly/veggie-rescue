import axios from 'axios';
const API_URL = '/api/admin/';
const SERVER_URL = process.env.REACT_APP_SERVER_URL ||  '';

interface AdminData {
  name: string;
  email: string;
  password: string;
}
interface AdminObject {
    email: string;
    password: string;
}

// Register admin
const register = async (admin: AdminData) => {
  const response = await axios.post(SERVER_URL+API_URL, admin);

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
  }
  return response.data;
};

// Login admin
const login = async (admin: AdminObject) => {
  const response = await axios.post(SERVER_URL+API_URL + 'login', admin);
  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout admin
const logout = () => localStorage.removeItem('admin');

const adminAuthService = {
  register,
  logout,
  login
};

export default adminAuthService;