import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dropoffsService from './dropoffsService';
import type { RootState } from '../../app/store';

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
      let { token } = state.driverAuth.driver;
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
  async (dropoff: DropoffObject, thunkAPI) => {
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
  async (dropoff: DropoffObject[], thunkAPI) => {
    try {
      // Set up token for authenticating route
      const state = thunkAPI.getState() as RootState;
      const { token } = state.driverAuth.driver;
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
      .addCase(getDropoffs.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(getDropoffs.fulfilled, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
        theState.dropoffs = action.payload;
      })
      .addCase(getDropoffs.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
      })
      .addCase(createDropoff.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(createDropoff.fulfilled, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
        theState.dropoffs = action.payload;
      })
      .addCase(createDropoff.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
      })
      .addCase(createBatchDropoff.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(createBatchDropoff.fulfilled, (state) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
      })
      .addCase(createBatchDropoff.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
      });
  }
});

export const { reset, setSuccess } = dropoffsSlice.actions;
export default dropoffsSlice.reducer;
