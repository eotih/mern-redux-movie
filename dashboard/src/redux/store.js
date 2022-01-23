import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducers';

export const store = configureStore({
  reducer: {
    authentication: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
