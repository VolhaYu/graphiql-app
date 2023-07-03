/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type SchemaTypes = {
  description: string;
  enumValues: number;
  fields: SchemaFields[];
  inputFields: InputFields[];
  interfaces: number;
  kind: string;
  name: string;
  possibleTypes: number;
};

export type SchemaFields = {
  args: Args[];
  deprecationReason: string;
  description: string;
  isDeprecated: boolean;
  name: string;
  type: {
    kind: string;
    name: string;
    ofType: {
      kind: string;
      name: string;
      ofType: {
        kind: string;
        name: string;
      };
    };
  };
};

export type Args = {
  name: string;
  description: string;
  defaultValue?: string;
  type: {
    kind: string;
    name: string;
    ofType: {
      kind: string;
      name: string;
      ofType: {
        kind: string;
        name: string;
        ofType: {
          kind: string;
          name: string;
        };
      };
    };
  };
};

export type InputFields = {
  name: string;
  description: string;
  defaultValue?: string;
  type: {
    kind: string;
    name: string;
    ofType: {
      kind: string;
      name: string;
      ofType: {
        kind: string;
        name: string;
        ofType: {
          kind: string;
          name: string;
        };
      };
    };
  };
};

interface ISchemaValue {
  value: SchemaTypes[];
}

const initialState: ISchemaValue = {
  value: [],
};

export const schemaValue = createSlice({
  name: 'schemaValue',
  initialState,
  reducers: {
    setSchemaValue(state, action: PayloadAction<SchemaTypes[]>) {
      state.value = action.payload;
    },
  },
});

export default schemaValue.reducer;
export const { setSchemaValue } = schemaValue.actions;
