import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

// Async thunk for fetching car details
export const fetchCarDetails = createAsyncThunk(
  'carDetails/fetchCarDetails',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/cars/${id}`);
    return response.data;
  },
);

// Initial state
const initialState = {
  carDetails: null,
  status: 'idle',
  error: null,
};

// Slice
const carDetailsSlice = createSlice({
  name: 'carDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetails.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchCarDetails.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        carDetails: action.payload.data,
      }))
      .addCase(fetchCarDetails.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default carDetailsSlice.reducer;
