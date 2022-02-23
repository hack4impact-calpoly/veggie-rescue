import { configureStore } from '@reduxjs/toolkit';
import driverAuthReducer from '../features/driverAuth/driverAuthSlice';

export const store = configureStore({
  reducer: {
    driverAuth: driverAuthReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {driverAuth: driverAuthState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
