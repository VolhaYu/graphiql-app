import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  name: string;
  email: string;
  password: string;
  registred: boolean;
}

const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  registred: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    addEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    addPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { addName, addEmail, addPassword } = authSlice.actions;
