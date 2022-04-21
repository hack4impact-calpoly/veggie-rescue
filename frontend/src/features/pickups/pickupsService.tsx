import axios from 'axios';
const API_URL = '/api/pickup/';

/////////////////////////////////////////
//                                     //
//         MASTER PICKUP LOG           //
//                                     //
/////////////////////////////////////////

//THIS IS WHERE YOU CAN DO YOUR API CALLS
//THE CONFIG IS WHERE IT AUTHORIZES USER TOKEN WITH BACKEND
//YOU CAN DO FULL CRUD OPS HERE

//  Get master log of pickups
const getPickups = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
// Register admin
// const register = async (admin: AdminData) => {
//   const response = await axios.get(API_URL, admin);

//   if (response.data) {
//     localStorage.setItem('pickups', JSON.stringify(response.data));
//   }
//   return response.data;
// };

// // Login admin
// const login = async (admin: AdminObject) => {
//   const response = await axios.post(API_URL + 'login', admin);
//   if (response.data) {
//     localStorage.setItem('admin', JSON.stringify(response.data));
//   }
//   return response.data;
// };

// Logout admin
//const logout = () => localStorage.removeItem('admin');

const pickupsService = {
getPickups
};

export default pickupsService;

