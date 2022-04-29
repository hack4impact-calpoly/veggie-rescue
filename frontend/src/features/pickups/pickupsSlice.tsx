import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pickupsService from './pickupsService';
import type { RootState } from '../../app/store';

// Interface for pickup items (This is what will be kept in store and what you will have access)
interface Pickup {
  _id: string;
  name: string;
}

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
      let token = state.driverAuth.driver.token;
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
  async (pickup: pickupObject, thunkAPI) => {
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

export const pickupsSlice = createSlice({
  name: 'pickup',
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
      .addCase(getPickups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPickups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pickups = action.payload;
      })
      .addCase(getPickups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPickup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPickup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pickups = action.payload;
      })
      .addCase(createPickup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = pickupsSlice.actions;
export default pickupsSlice.reducer;
