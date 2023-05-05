/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IResponseValue {
  value: string | undefined;
}

const initialState: IResponseValue = {
  value: ``,
};

export const responseValue = createSlice({
  name: 'responseValue',
  initialState,
  reducers: {
    setResponseValue(state, action: PayloadAction<string | undefined>) {
      state.value = action.payload;
    },
  },
});

export default responseValue.reducer;
export const { setResponseValue } = responseValue.actions;
