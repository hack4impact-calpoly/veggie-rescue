import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import driverAuthService from './driverAuthService';
// import type { RootState } from '../../app/store'

// Interface for driver object
interface Driver {
  _id: string;
  name: string;
  token: string;
}

// Interface for object when registering new driver
interface DriverData {
  name: string;
  email: string;
  pin: string;
}

// Define a type for the slice state
interface DriverAuthState {
  driver: Driver;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const emptyDriver = {} as Driver;

const initialState: DriverAuthState = {
  driver: JSON.parse(localStorage.getItem('driver') || '{}') as Driver,
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

export const authSlice = createSlice({
  name: 'driverAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
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
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;