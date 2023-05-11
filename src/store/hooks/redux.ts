import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  const { changeSigninSignUp, errorFirebase, errorEmail, errorPass } = useAppSelector(
    (state) => state.authReducer
  );
  return {
    changeSigninSignUp,
    errorFirebase,
    errorEmail,
    errorPass,
  };
}
