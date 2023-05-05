/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IResponseValue {
  value: string | undefined;
}

const initialState: IResponseValue = {
  value: `query allCharacters {
    characters {
      results {
        id
        name
      }
    }
  }`,
};

export const queryValue = createSlice({
  name: 'queryValue',
  initialState,
  reducers: {
    setQueryValue(state, action: PayloadAction<string | undefined>) {
      state.value = action.payload;
    },
  },
});

export default queryValue.reducer;
export const { setQueryValue } = queryValue.actions;
