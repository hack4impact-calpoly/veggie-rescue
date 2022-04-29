import axios from 'axios';
const API_URL = '/api/dropoffs/';

/////////////////////////////////////////
//                                     //
//        MASTER DROPOFF LOG           //
//                                     //
/////////////////////////////////////////

//THIS IS WHERE YOU CAN DO YOUR API CALLS
//THE CONFIG IS WHERE IT AUTHORIZES USER TOKEN WITH BACKEND
//YOU CAN DO FULL CRUD OPS HERE
interface dropoffObject {
 // date: String;
  driver: String;
  vehicle: String;
  name: String;
  recipientEntityType: String;
  demographic: String;
  foodType: String;
  area: String;
  lbsDroppedOff: Number;
}

//  Get master log of drop offs
const getDropoffs = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
//  Add a new dropoff
const createDropoff = async (dropoff: dropoffObject) => {
  const response = await axios.post(API_URL, dropoff);
  return response.data;
};

// create a batch dropoff log
const createBatchDropoff = async (
  dropoffs: dropoffObject[],
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(
    API_URL + 'batch',
   dropoffs,
    config
  );
  return response.data;
};

const dropoffsService = {
  getDropoffs,
  createDropoff,
  createBatchDropoff
};

export default dropoffsService;

