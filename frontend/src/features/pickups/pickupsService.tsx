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

interface pickupObject {
  date: String;
  driver: String;
  vehicle: String;
  name: String;
  donorEntityType: String;
  foodType: String;
  area: String;
  lbsPickedUp: Number;
}

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

//  Add a new pickup
const createPickup = async (pickup: pickupObject) => {
  const response = await axios.post(API_URL, pickup);
  return response.data;
};



// create a batch pickup log
const createBatchPickup = async (
  pickups: pickupObject[],
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(
    API_URL + 'batch',
   pickups,
    config
  );
  return response.data;
};

const pickupsService = {
  getPickups,
  createPickup,
  createBatchPickup
};

export default pickupsService;

