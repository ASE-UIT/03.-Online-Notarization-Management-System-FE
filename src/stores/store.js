import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import sessionSlice from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    session: sessionSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
