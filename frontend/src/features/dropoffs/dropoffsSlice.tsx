import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dropoffsService from './dropoffsService';
import type { RootState } from '../../app/store';

// Interface for dropoff items (This is what will be kept in store and what you will have access)
interface Dropoff {
  _id: string;
  name: string;
  token: string;
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
interface DropoffState {
  dropoffs: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const initialState: DropoffState = {
  dropoffs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};
// GET ALL LOGS

export const getDropoffs = createAsyncThunk(
  'api/dropoff',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let token = state.driverAuth.driver.token;
      if (!token) {
        token = state.adminAuth.admin.token;
      }

      return await dropoffsService.getDropoffs(token);
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

export const dropoffsSlice = createSlice({
  name: 'dropoff',
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
      .addCase(getDropoffs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDropoffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dropoffs = action.payload;
      })
      .addCase(getDropoffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = dropoffsSlice.actions;
export default dropoffsSlice.reducer;
