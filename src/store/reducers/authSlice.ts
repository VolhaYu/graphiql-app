/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  changeSigninSignUp: boolean;
  errorFirebase: string;
  errorEmail: string;
  errorPass: string;
}

const initialState: AuthState = {
  changeSigninSignUp: false,
  errorFirebase: '',
  errorEmail: '',
  errorPass: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changePageAuth(state, action: PayloadAction<boolean>) {
      state.changeSigninSignUp = action.payload;
    },
    setErrorFirebase(state, action) {
      state.errorFirebase = action.payload;
    },
    setErrorEmail(state, action) {
      state.errorEmail = action.payload;
    },
    setErrorPass(state, action) {
      state.errorPass = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { changePageAuth, setErrorFirebase, setErrorEmail, setErrorPass } = authSlice.actions;
