/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  token: string | null;
  id: string | null;
  emailErr: string | null;
  passErr: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  id: null,
  emailErr: null,
  passErr: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
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
export const { removeUser, setUser, setError } = authSlice.actions;
