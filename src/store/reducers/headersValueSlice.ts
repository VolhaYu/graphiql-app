/* eslint-disable no-empty */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IHeadersValue {
  value: string | undefined;
  parsedValue: {
    [key: string]: string | number;
  };
}

const initialState: IHeadersValue = {
  value: ``,
  parsedValue: {},
};

export const headersValue = createSlice({
  name: 'headersValue',
  initialState,
  reducers: {
    setHeadersValue(state, action: PayloadAction<string | undefined>) {
      state.value = action.payload;
      if (state.value) {
        try {
          state.parsedValue = JSON.parse(state.value);
        } catch {}
      }
    },
  },
});

export default headersValue.reducer;
export const { setHeadersValue } = headersValue.actions;
