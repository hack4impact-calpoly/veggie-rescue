import { configureStore } from '@reduxjs/toolkit';
import driverAuthReducer from '../features/driverAuth/driverAuthSlice';
import adminAuthReducer from '../features/adminAuth/adminAuthSlice';
import pickupsReducer from '../features/pickups/pickupsSlice';
import dropoffsReducer from '../features/dropoffs/dropoffsSlice';
import donorsReducer from '../features/donors/donorSlice';
import recipientsReducer from '../features/recipients/recipientsSlice';
import vehiclesReducer from '../features/vehicles/VehiclesSlice';
export const store = configureStore({
  reducer: {
    driverAuth: driverAuthReducer,
    adminAuth: adminAuthReducer,
    pickups: pickupsReducer,
    dropoffs: dropoffsReducer,
    donors: donorsReducer,
    recipients: recipientsReducer,
    vehicle: vehiclesReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {driverAuth: driverAuthState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
