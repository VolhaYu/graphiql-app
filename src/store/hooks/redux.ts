import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  const { id, email, token, emailErr, passErr } = useAppSelector((state) => state.authReducer);
  return {
    isAuth: !!email,
    email,
    id,
    token,
    emailErr,
    passErr,
  };
}
