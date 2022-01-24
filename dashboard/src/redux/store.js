import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducers';
import categoryReducer from './reducers/category.reducers';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    category: categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
