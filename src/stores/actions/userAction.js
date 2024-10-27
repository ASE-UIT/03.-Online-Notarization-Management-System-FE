import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';
import { setUser } from '../slices/userSlice';

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, updatedUserInfo }, thunkAPI) => {
  try {
    const response = await UserService.updateUserById(id, updatedUserInfo);
    thunkAPI.dispatch(setUser(response));
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Network Error');
  }
});
