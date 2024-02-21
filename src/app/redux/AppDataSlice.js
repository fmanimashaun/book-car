import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppData = createAsyncThunk('cars/fetchAppData', async () => {
  const response = await axios.get('http://localhost:4000/api/v1/initial_data');
  return response.data;
});

export const deleteCarFromDatabase = createAsyncThunk(
  'cars/deleteCar',
  async (options, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/cars/${options.carId}`, {
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
      });
      return options.carId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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
  reducers: {
    deleteCar: (state, action) => ({
      ...state,
      loading: false,
      error: false,
      appData: {
        ...state.appData,
        cars: state.appData.cars.filter((car) => car.id !== action.payload),
      },
    }),
  },
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
      }))
      .addCase(deleteCarFromDatabase.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteCarFromDatabase.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      .addCase(deleteCarFromDatabase.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: false,
        appData: {
          ...state.appData,
          cars: state.appData.cars.filter((car) => car.id !== action.payload),
        },
      }));
  },
});

export const { deleteCar } = appDataSlice.actions;
export default appDataSlice.reducer;
