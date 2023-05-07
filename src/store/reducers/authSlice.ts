/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  emailErr: string | null;
  passErr: string | null;
  changeSigninSignUp: boolean;
}

const initialState: AuthState = {
  emailErr: null,
  passErr: null,
  changeSigninSignUp: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changePageAuth(state, action) {
      state.changeSigninSignUp = action.payload;
    },
    setError(state, action) {
      state.emailErr = action.payload.emailErr;
      state.passErr = action.payload.passErr;
    },
    removeUError(state) {
      state.emailErr = null;
      state.passErr = null;
    },
  },
});

export default authSlice.reducer;
export const { setError, changePageAuth } = authSlice.actions;
