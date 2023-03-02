import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const API_URL = `${SERVER_URL}/api/dropoffs/`;

// MASTER DROPOFF LOG

// THIS IS WHERE YOU CAN DO YOUR API CALLS
// THE CONFIG IS WHERE IT AUTHORIZES USER TOKEN WITH BACKEND
// YOU CAN DO FULL CRUD OPS HERE

interface DropoffObject {
  // date: String;
  driver: String;
  vehicle: String;
  name: String;
  recipientEntityType: String;
  demographic: String;
  area: String;
  foodAllocation: Map<String, Number>;
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
const createDropoff = async (dropoff: DropoffObject) => {
  const response = await axios.post(API_URL, dropoff);
  return response.data;
};

// create a batch dropoff log
const createBatchDropoff = async (dropoffs: DropoffObject[], token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(`${API_URL}batch`, dropoffs, config);
  return response.data;
};

const dropoffsService = {
  getDropoffs,
  createDropoff,
  createBatchDropoff
};

export default dropoffsService;
