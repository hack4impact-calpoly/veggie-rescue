import { configureStore } from '@reduxjs/toolkit';
import driverAuthReducer from '../features/driverAuth/driverAuthSlice';
import adminAuthReducer from '../features/adminAuth/adminAuthSlice';
import vehicleReducer from '../features/vehicles/vehiclesSlice'

export const store = configureStore({
  reducer: {
    driverAuth: driverAuthReducer,
    adminAuth: adminAuthReducer,
    vehicle: vehicleReducer,
  }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {driverAuth: driverAuthState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;