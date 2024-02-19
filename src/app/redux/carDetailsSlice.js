import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching car details
export const fetchCarDetails = createAsyncThunk(
  'carDetails/fetchCarDetails',
  async (id) => {
    const response = await axios.get(`http://localhost:4000/api/v1/cars/${id}`);
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
