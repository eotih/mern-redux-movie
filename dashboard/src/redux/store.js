import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducers';
import categoryReducer from './reducers/category.reducers';
import actorReducer from './reducers/actor.reducers';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    category: categoryReducer,
    actor: actorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
