import axios from 'axios';
const API_URL = '/api/vehicles/';



//  Gets ALL vehicles ( Can be driver or admin to use this )
const getVehicles = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// //  Create new vehicle (For admin only)
const createVehicle = async (vehicleData: VehicleItem, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, vehicleData, config);
  return response.data;
};

// get driver vehicle only using driverId (For Driver only)
const getVehicle = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL + 'match', config);
  return response.data[0];
};

// update a vehicle given its id as a parameter... can be admin or driver
const update = async (
  vehicleData: VehicleItem | VehicleChoice,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  //using rest operator to take just the id out.
  const { _id, ...rest } = vehicleData;

  const response = await axios.put(
    API_URL + _id,
    {
      ...rest
    },
    config
  );
  return response.data;
};

// delete a vehicle given its id as a parameter... can be admin
const deleteVehicle = async (vehicleID: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(API_URL + vehicleID, config);
  return response.data;
};
// Need to implement this still
const logout = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  console.log('what the heck')

  //STILL NEED TO IMPLEMENT
  // const { name, _id } = vehicleData
  // const nameUpdate = (name === 'Personal Vehicle') ? id : '';
  // const response = await axios.put(API_URL + _id, {
  //     driver : nameUpdate,
  //     isLoggedIn : false,
  //     currentPickups : [],
  //     currentDropoffs : [],
  // },
  // config)
  // Logout user
  localStorage.removeItem('driver');
  //return response.data
};



interface Vehicle {
  _id: string;
  driver: string;
  name: string;
  isLoggedIn: boolean;
  img: string;
  currentPickups: locale[];
  currentDropoffs: locale[];
  totalWeight: number;
}
interface locale {
  name: string;
  donorLocationType: string;
  donorEntityType: string;
  foodType: string[];
  area: string;
  id: string;
}
// Define a type for a vehicle object
interface VehicleItem {
  _id: String;
  driver: String;
  name: String;
  isLoggedIn: Boolean;
  img: String;
  currentPickups: [];
  currentDropoffs: [];
  totalWeight: Number;
}
interface VehicleChoice {
  _id: string;
  driver: string;
  isLoggedIn: string;
}


const vehicleService = {
  getVehicles,
  logout,
  update,
  getVehicle,
  createVehicle,
  deleteVehicle

};
export default vehicleService;