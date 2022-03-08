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
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = emptyAdmin;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = emptyAdmin;
      })
      .addCase(clearAuth.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(clearAuth.fulfilled, (state) => {
        state.admin = emptyAdmin;
        state.isLoading = false;
        state.isSuccess = false;
      });
  }
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;