import { createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../actions/userAction';

const user = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  user,
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
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
