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

export const getFields = createAsyncThunk(
    'api/location/getFields',
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
    }
});


  





export const { reset, clear } = fieldSlice.actions;
export default fieldSlice.reducer;