import React, { useState } from 'react';
import '../components/formComponents/form.scss';
import SignUp from '../components/signUp';
import Login from '../components/login';
import { useAppDispatch, useAuth } from '../store/hooks/redux';
import { changePageAuth } from '../store/reducers/authSlice';

function UserAuth() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const dispatch = useAppDispatch();
  const { changeSigninSignUp } = useAuth();
  const changePage = () => {
    if (!isLoginPage) {
      dispatch(changePageAuth(true));
      return setIsLoginPage(true);
    }
    dispatch(changePageAuth(false));
    return setIsLoginPage(false);
  };

  return (
    <>
      <h1 className="form__h1">Create account</h1>
      {!changeSigninSignUp ? <SignUp /> : <Login />}
      <hr className="form__hr" />
      <p className="form__text">
        Already have an account?{' '}
        <span className="form__login" onClick={changePage}>
          {!changeSigninSignUp ? 'Login' : 'Registred'}
        </span>
      </p>
    </>
  );
}

export default UserAuth;
