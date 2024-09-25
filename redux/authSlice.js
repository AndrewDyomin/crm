import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { router } from 'expo-router';
import { Alert } from 'react-native'

axios.defaults.baseURL = 'https://furniture-production.onrender.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', credentials);
      setAuthHeader(res.data.token);
      router.replace('/home');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', {email, password});
      setAuthHeader(res.data.token);
      await AsyncStorage.setItem('token', res.data.token);
      router.replace('/(tabs)/home');

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout', 
  async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const stateString = await AsyncStorage.getItem('persist:auth');
      if (!stateString) {
        return thunkAPI.rejectWithValue('No persisted state found');
      }
      const state = JSON.parse(stateString);
      const persistedToken = state.token ? JSON.parse(state.token) : null;
      if (!persistedToken) {
        return thunkAPI.rejectWithValue('No token found');
      }
      setAuthHeader(persistedToken);
      const res = await axios.post('/auth/current');
      return res.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;