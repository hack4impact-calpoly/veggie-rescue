import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fieldService from './fieldService';
import type { RootState } from '../../app/store';

// add the following reducer: resetState

const FieldSchema = new mongoose.Schema(
    {
      EntityType: [String],
      LocationType: [String],
      CombinedAreaName: [String],
      OrgStructure: [String],
      DemographicsServed: [String],
      FoodDistModel: [String],
      FoodTypes: [String],
    },
    { collection: "Field" }
  );


// Field Object
interface FieldObject {
    EntityType: [String],
    LocationType: [String],
    CombinedAreaName: [String],
    OrgStructure: [String],
    DemographicsServed: [String],
    FoodDistModel: [String],
    FoodTypes: [String],
}

// Define a type for the slice state
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







export const { reset, clear } = fieldSlice.actions;