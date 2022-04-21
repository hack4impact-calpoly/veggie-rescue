import { createSlice, createAsyncThunk, EmptyObject } from '@reduxjs/toolkit';
import vehicleService from './VehiclesService';
import type { RootState } from '../../app/store';

const initialState: VehicleState = {
  vehicles: [],
  vehicle: {} as Vehicle,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedOut: false,
  message: ''
};

interface locale {
  name: string;
  donorLocationType: string;
  donorEntityType: string;
  foodType: string[];
  area: string;
  id: string;
}
// Interface for vehicles object
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

// Define a type for the slice state
interface VehicleState {
  vehicles: Vehicle[];
  vehicle: Vehicle;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoggedOut: boolean;
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
  totalWeight: Number;
}

interface VehicleChoice {
  _id: string;
  driver: string;
  isLoggedIn: string;
}

// Get all vehicles
export const getVehicles = createAsyncThunk(
  'api/vehicles',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let token = state.driverAuth.driver.token;
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
  async (vehicleData: VehicleItem, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;

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
      const token = state.driverAuth.driver.token;
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
  async (vehicleData: VehicleItem | VehicleChoice, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let token = state.driverAuth.driver.token;
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

// delete a vehicle given its id as a parameter... can be admin only
export const deleteVehicle = createAsyncThunk(
  'vehicles/delete:id',
  async (vehicleID: string, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let token = state.adminAuth.admin.token;

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

//Log Out this will take all logs in vehicle and put them in main log database...
//it will also clear the vehicle logs and update the weight

export const logoutVehicle = createAsyncThunk(
  'vehicles/logout',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.driverAuth.driver.token;
      const id = state.driverAuth.driver._id;
      return await vehicleService.logout(id, token);
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
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoggedOut = false;
      state.message = '';
    },
    clear: (state) => {
      state.vehicle = {} as Vehicle;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
    // setVehicle: (state)=>{state.vehicle = state.vehicles[0]},
    // setSpecificVehicle: (state, action)=>{
    //   state.vehicle = action.payload
    //   // state.vehicle === null ?  state.vehicle = null : state.vehicle.isLoggedIn = true
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vehicles = [];
      })
      .addCase(createVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicle = action.payload;
      })
      .addCase(getVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vehicle = {} as Vehicle;
      })
      // .addCase(getAllVehicles.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(getAllVehicles.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.allVehicles = action.payload
      // })
      // .addCase(getAllVehicles.rejected, (state, action ) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      //   state.allVehicles = []
      // })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicle = action.payload;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.vehicles = [];
      })
      .addCase(logoutVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutVehicle.fulfilled, (state) => {
        state.vehicles = [];
        state.vehicle = {} as Vehicle;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isLoggedOut = true;
      });
  }
});

export const { reset, clear } = vehicleSlice.actions;
export default vehicleSlice.reducer;
