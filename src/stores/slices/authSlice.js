import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout, refreshAccessToken, userGoogleLogin } from '../actions/authAction';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const userToken = Cookies.get('accessToken') || null;

const initialState = {
  userInfo,
  userToken,
  isAuthenticated: !!userToken,
  role: userInfo?.role || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {});
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
      state.isAuthenticated = true;
      state.role = payload.user.role;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.isAuthenticated = false;
      state.role = '';
    });
    builder.addCase(userLogout.pending, (state) => {});
    builder.addCase(userLogout.fulfilled, (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.isAuthenticated = false;
      state.role = '';
    });
    builder.addCase(userLogout.rejected, (state, { payload }) => {});
    builder.addCase(refreshAccessToken.pending, (state) => {});
    builder.addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
      const isTokenValid = (token) => {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 > Date.now();
      };

      if (isTokenValid(payload.userToken)) {
        state.userToken = payload.userToken;
      } else {
        console.log('Refreshed token is invalid or expired');
        state.userToken = null;
        state.isAuthenticated = false;
        state.role = '';
      }
    });
    builder.addCase(refreshAccessToken.rejected, (state, { payload }) => {});
    builder.addCase(userGoogleLogin.pending, (state) => {});
    builder.addCase(userGoogleLogin.fulfilled, (state, { payload }) => {
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
      state.isAuthenticated = true;
      state.role = payload.user.role;
    });
    builder.addCase(userGoogleLogin.rejected, (state, { payload }) => {
      state.isAuthenticated = false;
      state.role = '';
    });
  },
});

export default authSlice.reducer;
