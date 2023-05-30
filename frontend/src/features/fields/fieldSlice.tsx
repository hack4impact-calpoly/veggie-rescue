import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import fieldService from './fieldService';

// Field Object
interface Field {
  EntityType: string[];
  LocationType: string[];
  CombinedAreaName: string[];
  OrgStructure: string[];
  DemographicsServed: string[];
  FoodDistModel: string[];
  FoodType: string[];
}

// // Define a type for the slice state
interface FieldState {
  fields: Field;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const initialState: FieldState = {
  fields: {
    EntityType: [],
    LocationType: [],
    CombinedAreaName: [],
    OrgStructure: [],
    DemographicsServed: [],
    FoodDistModel: [],
    FoodType: []
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

interface EditFieldDataObject {
  fieldName: string;
  oldValue: string;
  newValue: string;
}

interface FieldDataObject {
  fieldName: string;
  value: string;
}

export const getFields = createAsyncThunk('api/fields', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    let { token } = state.driverAuth.driver;
    if (!token) {
      token = state.adminAuth.admin.token;
    }

    return await fieldService.getFields(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getFieldByName = createAsyncThunk(
  'api/fields/:name',
  async (name: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let { token } = state.driverAuth.driver;
      if (!token) {
        token = state.adminAuth.admin.token;
      }

      return await fieldService.getFieldByName(token, name);
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

export const createField = createAsyncThunk(
  'api/addField',
  async (fieldData: FieldDataObject, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.adminAuth.admin;
      return await fieldService.createField(fieldData, token);
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

export const editField = createAsyncThunk(
  'api/editField',
  async (fieldData: EditFieldDataObject, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.adminAuth.admin;

      return await fieldService.editField(fieldData, token);
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

export const deleteField = createAsyncThunk(
  'api/deleteField',
  async (fieldData: FieldDataObject, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.adminAuth.admin;

      return await fieldService.deleteField(fieldData, token);
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

export const fieldSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: ''
    }),
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFields.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(getFields.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        fields: action.payload
      }))
      .addCase(getFields.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }))
      .addCase(createField.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(createField.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        message: action.payload
      }))
      .addCase(createField.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }))
      .addCase(editField.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(editField.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        message: action.payload
      }))
      .addCase(editField.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }))
      .addCase(getFieldByName.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(getFieldByName.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        fields: action.payload
      }))
      .addCase(getFieldByName.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }))
      .addCase(deleteField.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(deleteField.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        message: action.payload
      }))
      .addCase(deleteField.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }));
  }
});

export const { reset, clear } = fieldSlice.actions;
export default fieldSlice.reducer;
