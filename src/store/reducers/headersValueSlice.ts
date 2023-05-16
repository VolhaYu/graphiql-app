/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IHeadersValue {
  value: string | undefined;
}

const initialState: IHeadersValue = {
  value: ``,
};

export const headersValue = createSlice({
  name: 'headersValue',
  initialState,
  reducers: {
    setHeadersValue(state, action: PayloadAction<string | undefined>) {
      state.value = action.payload;
    },
  },
});

export default headersValue.reducer;
export const { setHeadersValue } = headersValue.actions;
