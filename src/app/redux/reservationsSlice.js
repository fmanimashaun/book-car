import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

// Async thunk for fetching list of reservations
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const body = {
        reservation: { ...options.data },
      };
      const response = await axios.post(`${BASE_URL}/reservations`, body, {
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
  reservations: [],
  status: 'idle',
  error: null,
  message: '',
};

// Slice
const reservationsSlice = createSlice({
  name: 'reservations',
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
        reservations: action.payload.data,
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
        reservations: [...state.reservations, action.payload.data],
      }))
      .addCase(addReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default reservationsSlice.reducer;
