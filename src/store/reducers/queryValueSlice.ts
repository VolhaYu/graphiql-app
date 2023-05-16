/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IQueryValue {
  value: string | undefined;
  queryBody: string | undefined;
}

const initialState: IQueryValue = {
  value: `query allCharacters {
    characters {
      results {
        id
        name
      }
    }
  }`,
  queryBody: '',
};

export const queryValue = createSlice({
  name: 'queryValue',
  initialState,
  reducers: {
    setQueryValue(state, action: PayloadAction<string | undefined>) {
      state.value = action.payload;
    },
    setQueryBodyValue(state, action: PayloadAction<string | undefined>) {
      state.queryBody = action.payload;
    },
  },
});

export default queryValue.reducer;
export const { setQueryValue, setQueryBodyValue } = queryValue.actions;
