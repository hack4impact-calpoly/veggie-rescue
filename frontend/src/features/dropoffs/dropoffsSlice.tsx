import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dropoffsService from './dropoffsService';
import type { RootState } from '../../app/store';

interface dropoffObject {
  date: String;
  driver: String;
  vehicle: String;
  name: String;
  recipientEntityType: String;
  demographic: String;
  foodType: String;
  area: String;
  lbsDroppedOff: Number;
}


// // Define a type for the slice state
interface DropoffState {
  dropoffs: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isChecked: boolean;
  message: any | null;
}

const initialState: DropoffState = {
  dropoffs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isChecked: false,
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

export const createDropoff = createAsyncThunk(
  'api/createDropoff',
  async (dropoff: dropoffObject, thunkAPI) => {
    try {
      return await dropoffsService.createDropoff(dropoff);
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

export const createBatchDropoff = createAsyncThunk(
  'api/createBatchDropoff/batch',
  async (dropoff: dropoffObject[], thunkAPI) => {
    try {

       // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      const token = state.driverAuth.driver.token;
      return await dropoffsService.createBatchDropoff(dropoff, token);
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
    },
    setSuccess: (state) => {
      state.isSuccess = !state.isSuccess;
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
      })
            .addCase(createDropoff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDropoff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dropoffs = action.payload;
      })
      .addCase(createDropoff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBatchDropoff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatchDropoff.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createBatchDropoff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, setSuccess } = dropoffsSlice.actions;
export default dropoffsSlice.reducer;
