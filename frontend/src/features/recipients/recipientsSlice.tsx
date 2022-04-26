import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recipientsService from './recipientsService';
import type { RootState } from '../../app/store';

// Interface for recipient items (This is what will be kept in store and 
//what you will have access)  
interface Recipient {
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
interface RecipientState {
  recipients: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const initialState: RecipientState = {
  recipients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Get list of all recipients in DB
export const getRecipients = createAsyncThunk(
  'api/recipients',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let token = state.driverAuth.driver.token;
      if (!token) {
        token = state.adminAuth.admin.token;
      }

      return await recipientsService.getRecipients(token);
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

export const recipientsSlice = createSlice({
  name: 'recipients',
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
      .addCase(getRecipients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipients = action.payload;
      })
      .addCase(getRecipients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } =recipientsSlice.actions;
export default recipientsSlice.reducer;
