import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import queryValueSlice from './reducers/queryValueSlice';
import responseValueSlice from './reducers/responseValueSlice';
import variablesValueSlice from './reducers/variablesValueSlice';
import headersValueSlice from './reducers/headersValueSlice';
import schemaValueSlice from './reducers/schemaValueSlice';

const rootReducer = combineReducers({
  authReducer,
  queryValueSlice,
  responseValueSlice,
  variablesValueSlice,
  headersValueSlice,
  schemaValueSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
