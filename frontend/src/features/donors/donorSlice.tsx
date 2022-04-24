import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import donorsService from './donorsService';
import type { RootState } from '../../app/store';


// Donor Object
interface DonorObject   {
    id: string,
    name: string,
    EntityType: string,
    FoodType: string,
    LocationType: string,
    CombinedAreaName: string,
  }

// // Define a type for the slice state
interface DonorState {
  donors: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const initialState: DonorState = {
  donors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};


export const getDonors = createAsyncThunk(
  'api/location/donors/create',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let token = state.driverAuth.driver.token;
      if (!token) {
        token = state.adminAuth.admin.token;
      }

      return await donorsService.getDonors(token);
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

// Create donor 
export const createDonor = createAsyncThunk(
  'api/location/donors',
  async (donorData : DonorObject, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;
  
      return await donorsService.createDonor(donorData, token);
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

export const donorsSlice = createSlice({
  name: 'donors',
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
      .addCase(getDonors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDonors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.donors = action.payload;
      })
      .addCase(getDonors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createDonor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDonor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createDonor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = donorsSlice.actions;
export default donorsSlice.reducer;
