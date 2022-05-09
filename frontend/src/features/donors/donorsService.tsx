import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const API_URL = SERVER_URL + '/api/location/donor/';

/////////////////////////////////////////
//                                     //
//       LIST OF DONOR LOCATIONS       //
//                                     //
/////////////////////////////////////////

//THIS IS WHERE YOU CAN DO YOUR API CALLS
//THE CONFIG IS WHERE IT AUTHORIZES USER TOKEN WITH BACKEND
//YOU CAN DO FULL CRUD OPS HERE

interface DonorObject {
  id: string;
  name: string;
  EntityType: string;
  FoodType: string;
  LocationType: string;
  CombinedAreaName: string;
}

//  Get master log of donors
const getDonors = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// //  Create new donor (For admin only)
const createDonor = async (donorData: DonorObject, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, donorData, config);
  //For delete/add
  // const response = await axios.post(API_URL + donorData.id, donorData, config);
  return response.data;
};

const updateDonor = async (
  donorData: DonorObject,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  //using rest operator to take just the id out.
  const { id, ...rest } = donorData;

  const response = await axios.put(
    API_URL + id,
    {
      ...rest
    },
    config
  );
  return response.data;
};

const deleteDonor = async (donorID: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(API_URL + donorID, config);
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

const donorsService = {
getDonors,
createDonor,
updateDonor,
deleteDonor
};

export default donorsService;
