import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pickupsService from './pickupsService';
import type { RootState } from '../../app/store';

interface PickupObject {
  // date: String;
  driver: String;
  vehicle: String;
  name: String;
  donorEntityType: String;
  area: String;
  foodAllocation: Map<String, Number>;
}

// Define a type for the pickup slice state
interface PickupState {
  pickups: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const initialState: PickupState = {
  pickups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getPickups = createAsyncThunk(
  'api/pickups',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let { token } = state.driverAuth.driver;
      if (!token) {
        token = state.adminAuth.admin.token;
      }

      return await pickupsService.getPickups(token);
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

export const createPickup = createAsyncThunk(
  'api/createPickups',
  async (pickup: PickupObject, thunkAPI) => {
    try {
      return await pickupsService.createPickup(pickup);
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

export const createBatchPickup = createAsyncThunk(
  'api/createBatchPickups/batch',
  async (pickup: PickupObject[], thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      const { token } = state.driverAuth.driver;
      return await pickupsService.createBatchPickup(pickup, token);
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

export const pickupsSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    reset: (state) => {
      const theState = state;
      theState.isLoading = false;
      theState.isError = false;
      theState.isSuccess = false;
      theState.message = '';
    },
    setSuccess: (state) => {
      const theState = state;
      theState.isSuccess = !theState.isSuccess;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPickups.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(getPickups.fulfilled, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
        theState.pickups = action.payload;
      })
      .addCase(getPickups.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
      })
      .addCase(createPickup.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(createPickup.fulfilled, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
        theState.pickups = action.payload;
      })
      .addCase(createPickup.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
      })
      .addCase(createBatchPickup.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(createBatchPickup.fulfilled, (state) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
      })
      .addCase(createBatchPickup.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
      });
  }
});

export const { reset, setSuccess } = pickupsSlice.actions;
export default pickupsSlice.reducer;
