import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import donorsService from './donorsService';
import type { RootState } from '../../app/store';

// Interface for donor items (This is what will be kept in store and what you will have access)
interface Donor {
  _id: string;
  name: string;
}

// // Interface for object when registering new admin
// interface AdminData {
//   name: string;
//   email: string;
//   password: string;
// }
// interface AdminObject {
//     email: string;
//     password: string;
// }

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
  'api/donors',
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
      });
  }
});

export const { reset } = donorsSlice.actions;
export default donorsSlice.reducer;
