import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';
import userReducer from './user/userSlice';

// create store for redux using configureStore
export const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(shazamCoreApi.middleware),
});
