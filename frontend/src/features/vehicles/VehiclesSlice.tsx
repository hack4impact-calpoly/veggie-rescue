import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vehicleService from './VehiclesService';
import type { RootState } from '../../app/store';

const initialState: VehicleState = {
  vehicles: [],
  vehicle: {} as Vehicle,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedOut: false,
  isLoggingOut: false,
  isUpdateCount: 0,
  isUpdate: false,
  message: ''
};
interface PickupLog {
  _id: string;
  currentPickups: PickupObject[];
  totalFoodAllocation: Map<String, Number>;
}
interface DropoffLog {
  _id: string;
  currentDropoffs: DropoffObject[];
  totalFoodAllocation: Map<String, Number>;
}
interface PickupObject {
  // date: String;
  driver: String;
  vehicle: String;
  name: String;
  donorEntityType: String;
  area: String;
  foodAllocation: Map<String, Number>;
}

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
// Interface for vehicles object
interface Vehicle {
  _id: string;
  driver: string;
  name: string;
  isLoggedIn: boolean;
  img: string;
  currentPickups: PickupObject[];
  currentDropoffs: DropoffObject[];
  totalFoodAllocation: Map<String, number>;
}

// Define a type for the slice state
interface VehicleState {
  vehicles: Vehicle[];
  vehicle: Vehicle;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoggedOut: boolean;
  isLoggingOut: boolean;
  isUpdate: boolean;
  isUpdateCount: number;
  message: any | [];
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
  totalFoodAllocation: Map<String, Number>;
}
interface NewVehicle {
  name: String;
  img: String;
}
interface UpdateVehicle {
  _id: string;
  name: string;
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
// Define a type for a vehicle object
interface VehicleLogout {
  _id: String;
  driver: String;
  isLoggedIn: string;
  currentPickups: PickupObject[];
  currentDropoffs: DropoffObject[];
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
    foodAllocation: Map<String, Number>;
  };
  totalFoodAllocation: Map<String, Number>;
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
    foodAllocation: Map<String, Number>;
  };
  totalFoodAllocation: Map<String, Number>;
}

// Get all vehicles
export const getVehicles = createAsyncThunk(
  'api/vehicles',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let { token } = state.driverAuth.driver;
      if (!token) {
        token = state.adminAuth.admin.token;
      }

      return await vehicleService.getVehicles(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new vehicle (admin only)
export const createVehicle = createAsyncThunk(
  'api/createVehicles',
  async (vehicleData: VehicleItem | NewVehicle, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.adminAuth.admin;

      return await vehicleService.createVehicle(vehicleData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get driver vehicle only using driverId (For Driver only)
export const getVehicle = createAsyncThunk(
  'vehicles/getVehicle',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.driverAuth.driver;
      return await vehicleService.getVehicle(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update a vehicle given its id as a parameter... can be admin or driver
export const updateVehicle = createAsyncThunk(
  'vehicles/update:id',
  async (
    vehicleData:
      | VehicleItem
      | VehicleChoice
      | PickupSchema
      | DropoffSchema
      | UpdateVehicle
      | VehicleWeightTransfer
      | PickupLog
      | DropoffLog,
    thunkAPI
  ) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let { token } = state.driverAuth.driver;
      if (!token) {
        token = state.adminAuth.admin.token;
      }
      return await vehicleService.update(vehicleData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update a vehicle given its id as a parameter, this is special case for updating multiple vehicles... can be admin or driver
export const updateTwo = createAsyncThunk(
  'vehicles/update:id2',
  async (vehicleData: VehicleWeightTransfer, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let { token } = state.driverAuth.driver;
      if (!token) {
        token = state.adminAuth.admin.token;
      }
      return await vehicleService.updateTwo(vehicleData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete a vehicle given its id as a parameter... can be admin only
export const deleteVehicle = createAsyncThunk(
  'vehicles/delete:id',
  async (vehicleID: string, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      const { token } = state.adminAuth.admin;

      return await vehicleService.deleteVehicle(vehicleID, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// it will also clear the vehicle logs and update the weight
export const logoutVehicle = createAsyncThunk(
  'vehicles/logout',
  async (vehicleData: VehicleLogout, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let { token } = state.driverAuth.driver;
      if (!token) {
        token = state.adminAuth.admin.token;
      }
      return await vehicleService.logout(vehicleData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isLoading: false,
      isError: false,
      isSuccess: false,
      isLoggedOut: false,
      isUpdate: false,
      isUpdateCount: 0,
      message: ''
    }),
    clear: (state) => ({
      ...state,
      vehicle: {} as Vehicle,
      isError: false,
      isSuccess: false,
      isLoading: false,
      isUpdate: false,
      isLoggedOut: false,
      isLoggingOut: false,
      message: ''
    }),
    setIsLoggingOut: (state) => ({
      ...state,
      isLoggingOut: !state.isLoggingOut
    }),
    setIsUpdate: (state) => ({
      ...state,
      isUpdate: !state.isUpdate
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(getVehicles.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        vehicles: action.payload
      }))
      .addCase(getVehicles.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        vehicles: []
      }))
      .addCase(createVehicle.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(createVehicle.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isUpdate: true,
        isSuccess: true
      }))
      .addCase(createVehicle.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }))
      .addCase(getVehicle.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(getVehicle.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        vehicle: action.payload
      }))
      .addCase(getVehicle.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        vehicle: {} as Vehicle
      }))
      .addCase(updateVehicle.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(updateVehicle.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isUpdate: true,
        vehicle: action.payload
      }))
      .addCase(updateVehicle.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        vehicles: []
      }))
      .addCase(updateTwo.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(updateTwo.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isUpdate: true,
        isUpdateCount: state.isUpdateCount + 1
      }))
      .addCase(updateTwo.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        vehicles: []
      }))
      .addCase(deleteVehicle.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(deleteVehicle.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isUpdate: true,
        vehicle: action.payload
      }))
      .addCase(deleteVehicle.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        vehicles: []
      }))
      .addCase(logoutVehicle.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(logoutVehicle.fulfilled, (state) => ({
        ...state,
        vehicles: [],
        vehicle: {} as Vehicle,
        isError: false,
        isSuccess: false,
        isLoading: false,
        isLoggedOut: true
      }));
  }
});

export const { reset, clear, setIsLoggingOut, setIsUpdate } =
  vehicleSlice.actions;
export default vehicleSlice.reducer;
