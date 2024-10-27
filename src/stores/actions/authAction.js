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
      accessToken: response.tokens.access.token,
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
    thunkAPI.dispatch(setUser({ user: null }));
    return true;
  } catch (status) {
    return thunkAPI.rejectWithValue(status);
  }
});
