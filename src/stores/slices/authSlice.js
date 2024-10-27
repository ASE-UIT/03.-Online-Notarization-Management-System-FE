import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout } from '../actions/authAction';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('accessToken');

const initialState = {
  isAuthenticated: !!accessToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.role = payload.user.role;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isAuthenticated = false;
      state.role = '';
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.role = '';
    });
  },
});

export default authSlice.reducer;
