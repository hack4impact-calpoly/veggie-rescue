import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const API_URL = `${SERVER_URL}/api/vehicles/`;

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
const createVehicle = async (
  vehicleData: VehicleItem | NewVehicle,
  token: string
) => {
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
  const response = await axios.get(`${API_URL}match`, config);
  return response.data[0];
};

// update a vehicle given its id as a parameter... can be admin or driver
const update = async (
  vehicleData:
    | VehicleItem
    | VehicleChoice
    | VehicleWeightTransfer
    | PickupSchema
    | DropoffSchema
    | UpdateVehicle
    | VehicleWeightTransfer
    | PickupLog
    | DropoffLog,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // using rest operator to take just the id out.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = vehicleData;
  console.log(vehicleData);
  console.log(JSON.stringify(vehicleData));
  const response = await axios.put(
    API_URL + _id,
    {
      ...rest
    },
    config
  );
  console.log(response);
  return response.data;
};

// update a vehicle given its id as a parameter(special case)... can be admin or driver
const updateTwo = async (vehicleData: VehicleWeightTransfer, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // using rest operator to take just the id out.
  // eslint-disable-next-line @typescript-eslint/naming-convention
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

const logout = async (VehicleLogout: VehicleLogout, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // using rest operator to take just the id out.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...rest } = VehicleLogout;
  // const nameUpdate = (name === 'Personal Vehicle') ? id : '';
  const response = await axios.put(
    API_URL + _id,
    {
      ...rest
    },
    config
  );

  // Logout user
  localStorage.removeItem('driver');
  return response.data;
};

// Define a type for a vehicle object
interface VehicleItem {
  _id: String;
  driver: String;
  name: String;
  isLoggedIn: Boolean;
  img: String;
  currentPickups: [];
  currentDropoffs: [];
  totalFoodAllocation: Map<String, number>;
}
interface NewVehicle {
  name: String;
  img: String;
}
interface VehicleChoice {
  _id: string;
  driver: string;
  isLoggedIn: string;
}
interface VehicleWeightTransfer {
  _id: string;
  totalFoodAllocation: Map<String, Number>;
}
interface UpdateVehicle {
  _id: string;
  name: string;
}
interface VehicleLogout {
  _id: String;
  driver: String;
  isLoggedIn: string;
  currentPickups: PickupObject[];
  currentDropoffs: DropoffObject[];
}
interface PickupLog {
  _id: string;
  currentPickups: PickupObject[];
  totalFoodAllocation: Map<String, number>;
}
interface DropoffLog {
  _id: string;
  currentDropoffs: DropoffObject[];
  totalFoodAllocation: Map<String, number>;
}
interface PickupObject {
  // date: String;
  driver: String;
  vehicle: String;
  name: String;
  donorEntityType: String;
  area: String;
  foodAllocation: Map<String, number>;
}

interface DropoffObject {
  // date: String;
  driver: String;
  vehicle: String;
  name: String;
  recipientEntityType: String;
  demographic: String;
  area: String;
  foodAllocation: Map<String, number>;
}

interface PickupSchema {
  _id: String;
  currentPickups: {
    // date: String,
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    area: String;
    foodAllocation: Map<String, number>;
  };
  totalFoodAllocation: Map<String, number>;
}
interface DropoffSchema {
  _id: String;
  currentDropoffs: {
    // date: String,
    driver: String;
    vehicle: String;
    name: String;
    recipientEntityType: String;
    demographic: String;
    area: String;
    foodAllocation: Map<String, number>;
  };
  totalFoodAllocation: Map<String, number>;
}

const vehicleService = {
  getVehicles,
  logout,
  update,
  getVehicle,
  createVehicle,
  deleteVehicle,
  updateTwo
};
export default vehicleService;
