import axios from 'axios';
const API_URL = '/api/locations/recipient';

/////////////////////////////////////////
//                                     //
//     LIST OF RECIPIENT LOCATIONS     //
//                                     //
/////////////////////////////////////////


//THIS IS WHERE YOU CAN DO YOUR API CALLS
//THE CONFIG IS WHERE IT AUTHORIZES USER TOKEN WITH BACKEND
//YOU CAN DO FULL CRUD OPS HERE



//  Get  log of ALL recipients 
//  DONE
const getRecipients = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add a recipients
const createRecipient = async (recipientData: RecipientObj, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, recipientData, config);
  return response.data;
};

// Update recipients
const updateRecipient = async (
  recipientData: RecipientObj, 
  token: string
  ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const {name, ...rest} = recipientData;
  const response = await axios.put(
    API_URL + name, 
    {
      ...rest
    }, config);
  return response.data;
};

// Delete recipients
const deleteRecipient = async (recipientId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.delete(API_URL + recipientId, config);
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




// Define a type for a recipient object

interface RecipientObj{
  name: String,
  EntityType: String,
  DemographicName: String,
  FoodType: String,
  CombinedAreaName: String
}


const recipientsService = {
  getRecipients,
  createRecipient,
  updateRecipient,
  deleteRecipient

};

export default recipientsService;