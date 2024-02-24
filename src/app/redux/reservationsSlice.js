import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

// Async thunk for fetching list of reservations
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (options, thunkAPI) => {
    try {
      const body = {
        reservation: { ...options.data },
      };
      const response = await axios.get(`${BASE_URL}/reservations`, body, {
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Async thunk for adding a new reservation
export const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async (options, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/reservations`, options.data, {
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Initial state
const initialState = {
  reservarions: [],
  status: 'idle',
  error: null,
  message: '',
};

// Slice
const reservationsSlice = createSlice({
  name: 'reservarions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        reservarions: action.payload.data,
        message: action.payload.status.message,
      }))
      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(addReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addReservation.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        reservarions: [...state.reservarions, action.payload.data],
      }))
      .addCase(addReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default reservationsSlice.reducer;
