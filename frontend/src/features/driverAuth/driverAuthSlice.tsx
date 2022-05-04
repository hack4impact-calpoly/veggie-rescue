import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import driverAuthService from './driverAuthService';
import type { RootState } from '../../app/store';

// Interface for driver object
interface Driver {
  id: string;
  name: string;
  token: string;
}

// Interface for object when registering new driver
interface DriverData {
   _id: string,
  name: string;
  email: string;
  pin: string;
}

// Define a type for the slice state
interface DriverAuthState {
  driver: Driver;
  drivers: [],
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const emptyDriver = {} as Driver;

const initialState: DriverAuthState = {
  driver: JSON.parse(localStorage.getItem('driver') || '{}') as Driver,
  drivers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Register new driver
export const register = createAsyncThunk(
  'driverAuth/register',
  async (driverData: DriverData, thunkAPI) => {
    try {
      return await driverAuthService.register(driverData);
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

// Login driver
export const login = createAsyncThunk(
  'driverAuth/login',
  async (pin: string, thunkAPI) => {
    try {
      return await driverAuthService.login(pin);
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

// Logout driver
export const clearAuth = createAsyncThunk('driverAuth/logout', async () => {
  await driverAuthService.logout();
});


// Get all drivers
export const getDrivers = createAsyncThunk(
  'api/drivers',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let token = state.adminAuth.admin.token;
      if (!token) {
        token = state.driverAuth.driver.token;
      }

      return await driverAuthService.getDrivers(token);
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

// Create new driver (admin only)
export const createDriver = createAsyncThunk(
  'api/createDriver',
  async (driverData: DriverData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;

      return await driverAuthService.createDriver(driverData, token);
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
export const getDriver = createAsyncThunk(
  'drivers/getDriver',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;
      return await driverAuthService.getDriver(token);
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

// update a driver given its id as a parameter... can be admin or driver
export const updateDriver = createAsyncThunk(
  'drivers/update:id',
  async (driverData: DriverData, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let token = state.adminAuth.admin.token;
      if (!token) {
        token = state.driverAuth.driver.token;
      }
      return await driverAuthService.update(driverData, token);
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

// delete a driver given its id as a parameter... can be admin only
export const deleteDriver = createAsyncThunk(
  'drivers/delete:id',
  async (driverID: string, thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      let token = state.adminAuth.admin.token;
      return await driverAuthService.deleteDriver(driverID, token);
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

export const authSlice = createSlice({
  name: 'driverAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false ;
      state.message = '';
    },
    clear: (state) => {
    state.driver = {} as Driver
    state.isError = false
    state.isSuccess = false 
    state.isLoading = false 
    state.message = ''    
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.driver = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.driver = emptyDriver;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.driver = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.driver = emptyDriver;
      })
      .addCase(clearAuth.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(clearAuth.fulfilled, (state) => {
        state.driver = emptyDriver;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getDrivers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.drivers = action.payload;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.drivers = [];
      })
      .addCase(createDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.driver = action.payload;
      })
      .addCase(getDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.driver = {} as Driver;
      })
      .addCase(updateDriver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.driver = action.payload;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.drivers = [];
      })
  }
});

export const { reset, clear  } = authSlice.actions;
export default authSlice.reducer;