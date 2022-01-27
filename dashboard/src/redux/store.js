import { configureStore } from '@reduxjs/toolkit';
import { authReducer, categoryReducer, actorReducer, movieReducer, userReducer } from './reducers';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    category: categoryReducer,
    movie: movieReducer,
    user: userReducer,
    actor: actorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
