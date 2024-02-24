import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkExpiry } from 'helpers/decodeJwt';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const initialState = {
  user: '',
  isLoggedIn: false,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    // Payload is an object that contains email and password keys.
    try {
      const resp = await request.post('/login', {
        user: payload,
      });

      const user = resp.data.data;
      const token = resp.headers.authorization.split(' ')[1];
      user.token = token;
      return user;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return thunkAPI.rejectWithValue(error.response.data);
        }

        if (error.response.status === 500) return thunkAPI.rejectWithValue('Error: An internal server error has occured.');
      }
      return thunkAPI.rejectWithValue('Error: An unknown error has occured, please try again.');
    }
  },
);

export const register = createAsyncThunk(
  'auth/signup',
  async (payload, thunkAPI) => {
    // Payload is an object that contains email, username, name and password keys.
    try {
      const resp = await request.post('/signup', {
        user: payload,
      });

      const user = resp.data.data;
      const token = resp.headers.authorization.split(' ')[1];
      user.token = token;
      return user;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          return thunkAPI.rejectWithValue(error.response.data.status.message);
        }

        if (error.response.status === 500) return thunkAPI.rejectWithValue('Error: An internal server error has occured.');
      }
      return thunkAPI.rejectWithValue('Error: An unknown error has occured, please try again.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLogin: (state) => {
      const isExpired = checkExpiry(state.token);

      if (isExpired) {
        return {
          user: '',
          isLoggedIn: false,
        };
      }

      return { ...state };
    },
    logout: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => ({ ...state, isLoading: true, message: '' }))
      .addCase(login.fulfilled, (state, { payload }) => ({
        isLoggedIn: true,
        user: payload,
        isLoading: false,
      }))
      .addCase(login.rejected,
        (state, action) => ({ ...state, isLoading: false, message: action.payload }))
      .addCase(register.pending, (state) => ({ ...state, isLoading: true, message: '' }))
      .addCase(register.fulfilled, (state, { payload }) => ({
        isLoggedIn: true,
        user: payload,
        isLoading: false,
      }))
      .addCase(register.rejected,
        (state, action) => ({ ...state, isLoading: false, message: action.payload }));
  },
});

export const { logout, updateLogin } = authSlice.actions;

export const authReducer = authSlice.reducer;
