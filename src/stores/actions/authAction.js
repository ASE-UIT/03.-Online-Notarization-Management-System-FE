import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import Cookies from 'js-cookie';
import { setUser } from '../slices/userSlice';

export const userLogin = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await AuthService.login(email, password);
    thunkAPI.dispatch(setUser(response.user));
    return {
      user: response.user,
      userToken: response.tokens.access.token,
    };
  } catch (status) {
    return thunkAPI.rejectWithValue(status);
  }
});

export const userLogout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    return thunkAPI.rejectWithValue('No refresh token found');
  }

  try {
    await AuthService.logout(refreshToken);
    return true;
  } catch (status) {
    return thunkAPI.rejectWithValue(status);
  }
});

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const response = await AuthService.refreshAccessToken();
    return { userToken: response.tokens.access.token };
  } catch (status) {
    return thunkAPI.rejectWithValue(status);
  }
});

export const userGoogleLogin = createAsyncThunk('auth/google', async ({ userData, userToken }, thunkAPI) => {
  if (!userData || !userToken) {
    return thunkAPI.rejectWithValue('Invalid Google login data');
  }

  try {
    return {
      user: userData,
      userToken: userToken,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
