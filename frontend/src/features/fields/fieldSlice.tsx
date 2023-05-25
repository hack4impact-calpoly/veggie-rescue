import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import fieldService from './fieldService';


// Field Object
interface FieldObject   {
    id: string,
    EntityType: string[],
    LocationType: string[],
    CombinedAreaName: string[],
    OrgStructure: string[],
    DemographicsServed : string[],
    FoodDistModel : string[],
    FoodTypes: string[],
  }

// // Define a type for the slice state
interface FieldState {
  fields: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | null;
}

const initialState: FieldState = {
  fields: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

interface EditFieldDataObject {
    fieldName: string,
    oldValue: string,
    newValue: string
  }
  
  interface FieldDataObject {
    fieldName: string,
    value: string
  }


export const getFields = createAsyncThunk(
    'api/fields',
    async (_, thunkAPI) => {
      try {
        const state = thunkAPI.getState() as RootState;
        let { token } = state.driverAuth.driver;
        if (!token) {
          token = state.adminAuth.admin.token;
        }
  
        return await fieldService.getFields(token);
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
    async (fieldId: FieldDataObject, thunkAPI) => {
      try {
        const state = thunkAPI.getState() as RootState;
        const { token } = state.adminAuth.admin;
  
        return await fieldService.deleteField(fieldId, token);
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

