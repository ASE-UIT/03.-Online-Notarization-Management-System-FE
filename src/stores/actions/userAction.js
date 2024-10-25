import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (id) => {
  try {
    const response = await UserService.getUserById(id);
    localStorage.setItem('user', JSON.stringify(response.data));
    const data = await response.json();
    return data;
  } catch (error) {}
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, updatedUserInfo }, thunkAPI) => {
  try {
    const response = await UserService.updateUserById(id, updatedUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(response));
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Network Error');
  }
});
