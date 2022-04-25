import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recipientsService from './recipientsService';
import type { RootState } from '../../app/store';


// Interface for recipient items (This is what will be kept in store and 
//what you will have access)  

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



// Define a type for a recipient object

interface RecipientObj{
  name: String,
  EntityType: String,
  DemographicName: String,
  FoodType: String,
  CombinedAreaName: String
}


// Get list of all recipients in DB
export const getRecipients = createAsyncThunk(
  'api/location/getRecipients',
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


// ADD: Accessible only by Admin via line 94
export const createRecipient = createAsyncThunk(
  'api/location/addRecipients',
  async (recipientData: RecipientObj, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;

      return await recipientsService.createRecipient(recipientData, token);
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
)

// UPDATE: Accessible only by Admin
export const updateRecipient = createAsyncThunk(
  'api/location/updateRecipient',
  async (recipientData: RecipientObj, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;

      return await recipientsService.updateRecipient(recipientData, token);
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
)

// DELETE: Accessible only by Admin
export const deleteRecipient = createAsyncThunk(
  'api/location/deleteRecipient',
  async (recipientId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.adminAuth.admin.token;

      return await recipientsService.deleteRecipient(recipientId, token);
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
)

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
      })
      .addCase(createRecipient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipients = action.payload;
      })
      .addCase(createRecipient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRecipient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRecipient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipients = action.payload;
      })
      .addCase(updateRecipient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRecipient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecipient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipients = action.payload;
      })
      .addCase(deleteRecipient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } =recipientsSlice.actions;
export default recipientsSlice.reducer;