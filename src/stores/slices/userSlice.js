// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData, updateUser } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  updateStatus: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {});
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(updateUser.rejected, (state) => {});
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
