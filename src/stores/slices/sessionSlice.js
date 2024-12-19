import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadFileSuccessState: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    uploadFileSuccess: (state, action) => {
      state.uploadFileSuccessState = action.payload;
    },
  },
});

export const { uploadFileSuccess } = sessionSlice.actions;
export default sessionSlice.reducer;
