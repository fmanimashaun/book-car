import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './redux/CarsSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export default store;
