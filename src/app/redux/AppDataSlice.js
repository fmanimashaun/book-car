import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const fetchAppData = createAsyncThunk('cars/fetchAppData', async () => {
  const response = await axios.get(`${BASE_URL}/initial_data`);
  return response.data;
});

export const createCarOnServer = createAsyncThunk(
  'cars/createCar',
  async (options, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/cars`, options.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${options.token}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteCarFromDatabase = createAsyncThunk(
  'cars/deleteCar',
  async (options, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/cars/${options.carId}`, {
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
    deleteCar: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    createCar: (state) => ({
      ...state,
      loading: true,
      error: null,
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
          engine_types: action.payload.data.engine_types,
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
      }))
      .addCase(createCarOnServer.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(createCarOnServer.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        appData: {
          ...state.appData,
          cars: [...state.appData.cars, action.payload.data],
        },
      }))
      .addCase(createCarOnServer.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }));
  },
});

export const { deleteCar } = appDataSlice.actions;
export default appDataSlice.reducer;
