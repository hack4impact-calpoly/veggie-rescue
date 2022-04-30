import axios from 'axios';
const API_URL = '/api/location/recipient';
/////////////////////////////////////////
//                                     //
//     LIST OF RECIPIENT LOCATIONS     //
//                                     //
/////////////////////////////////////////


//THIS IS WHERE YOU CAN DO YOUR API CALLS
//THE CONFIG IS WHERE IT AUTHORIZES USER TOKEN WITH BACKEND
//YOU CAN DO FULL CRUD OPS HERE



//  Get  log of ALL recipients
const getRecipients = async (token: string) => {
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

const recipientsService = {
  getRecipients
};

export default recipientsService;
