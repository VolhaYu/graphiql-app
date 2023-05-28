/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IResponseStatus {
  ok: boolean;
}

const initialState: IResponseStatus = {
  ok: false,
};

export const responseStatus = createSlice({
  name: 'responseStatus',
  initialState,
  reducers: {
    setResponseStatus(state, action: PayloadAction<boolean>) {
      state.ok = action.payload;
    },
  },
});

export default responseStatus.reducer;
export const { setResponseStatus } = responseStatus.actions;
