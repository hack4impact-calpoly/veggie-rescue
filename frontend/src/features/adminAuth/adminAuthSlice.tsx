import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminAuthService from './adminAuthService';
// import type { RootState } from '../../app/store'

// Interface for admin object
interface Admin {
  _id: string;
  name: string;
  token: string;
}

// Interface for object when registering new admin
interface AdminData {
  name: string;
  email: string;
  password: string;
}
interface AdminObject {
  email: string;
  password: string;
}

// Define a type for the slice state
interface AdminAuthState {
  admin: Admin;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const emptyAdmin = {} as Admin;

const initialState: AdminAuthState = {
  admin: JSON.parse(localStorage.getItem('admin') || '{}') as Admin,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Register new admin
export const register = createAsyncThunk(
  'adminAuth/register',
  async (adminData: AdminData, thunkAPI) => {
    try {
      return await adminAuthService.register(adminData);
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

// Login admin
export const login = createAsyncThunk(
  'adminAuth/login',
  async (admin: AdminObject, thunkAPI) => {
    try {
      return await adminAuthService.login(admin);
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

// Logout admin
export const clearAuth = createAsyncThunk('adminAuth/logout', async () => {
  await adminAuthService.logout();
});

export const adminSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    reset: (state) => {
      const theState = state;
      theState.isLoading = false;
      theState.isError = false;
      theState.isSuccess = false;
      theState.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
        theState.admin = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
        theState.admin = emptyAdmin;
      })
      .addCase(login.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isSuccess = true;
        theState.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        const theState = state;
        theState.isLoading = false;
        theState.isError = true;
        theState.message = action.payload;
        theState.admin = emptyAdmin;
      })
      .addCase(clearAuth.pending, (state) => {
        const theState = state;
        theState.isLoading = true;
        theState.isSuccess = false;
      })
      .addCase(clearAuth.fulfilled, (state) => {
        const theState = state;
        theState.admin = emptyAdmin;
        theState.isLoading = false;
        theState.isSuccess = false;
      });
  }
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
