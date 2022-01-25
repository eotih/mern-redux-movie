import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducers';
import categoryReducer from './reducers/category.reducers';
import actorReducer from './reducers/actor.reducers';
import movieReducer from './reducers/movie.reducers';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    category: categoryReducer,
    movie: movieReducer,
    actor: actorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
