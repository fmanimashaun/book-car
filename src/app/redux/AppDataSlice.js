import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppData = createAsyncThunk('cars/fetchAppData', async () => {
  const response = await axios.get('http://localhost:4000/api/v1/initial_data');
  return response.data;
});

const initialState = {
  appData: {
    cars: [],
    cities: [],
    engine_types: [],
  },
  loading: false,
  error: null,
};

const appDataSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppData.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchAppData.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        appData: {
          ...state.appData,
          cars: action.payload.data.cars,
          cities: action.payload.data.cities,
          engine_type: action.payload.data.engine_types,
        },
      }))
      .addCase(fetchAppData.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default appDataSlice.reducer;
