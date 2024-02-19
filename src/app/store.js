import { configureStore } from '@reduxjs/toolkit';
import AppDataSlice from './redux/AppDataSlice';
import carDetailsSlice from './redux/carDetailsSlice';

const store = configureStore({
  reducer: {
    appData: AppDataSlice,
    carDetails: carDetailsSlice,
  },
});

export default store;
