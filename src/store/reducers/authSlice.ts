/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  changeSigninSignUp: boolean;
}

const initialState: AuthState = {
  changeSigninSignUp: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changePageAuth(state, action: PayloadAction<boolean>) {
      state.changeSigninSignUp = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { changePageAuth } = authSlice.actions;
