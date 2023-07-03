/* eslint-disable no-empty */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IVariablesValue {
  value: string | undefined;
  parsedValue: {
    [key: string]: string | number;
  };
}

const initialState: IVariablesValue = {
  value: ``,
  parsedValue: {},
};

export const variablesValue = createSlice({
  name: 'variablesValue',
  initialState,
  reducers: {
    setVariablesValue(state, action: PayloadAction<string | undefined>) {
      state.value = action.payload;
      if (state.value) {
        try {
          state.parsedValue = JSON.parse(state.value);
        } catch {}
      }
    },
  },
});

export default variablesValue.reducer;
export const { setVariablesValue } = variablesValue.actions;
