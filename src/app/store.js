import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AppDataSlice from './redux/AppDataSlice';
import carDetailsSlice from './redux/carDetailsSlice';
import { authReducer } from './redux/auth/authSlice';

const rootReducer = combineReducers({
  appData: AppDataSlice,
  carDetails: carDetailsSlice,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
