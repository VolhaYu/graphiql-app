import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import queryValueSlice from './reducers/queryValueSlice';
import responseValueSlice from './reducers/responseValueSlice';

const rootReducer = combineReducers({
  authReducer,
  queryValueSlice,
  responseValueSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
