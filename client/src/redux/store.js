import { configureStore } from '@reduxjs/toolkit';
import { movieReducer } from './reducers';

export const store = configureStore({
    reducer: {
        movie: movieReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
