import React, { useState } from 'react';
import './UserAuth.scss';
import SignUp from '../../components/AuthComponents/signUp';
import Login from '../../components/AuthComponents/login';
import { useAppDispatch, useAuth } from '../../store/hooks/redux';
import { changePageAuth, setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';

function UserAuth() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const dispatch = useAppDispatch();
  const { changeSigninSignUp } = useAuth();
  const changePage = () => {
    if (!isLoginPage) {
      dispatch(changePageAuth(true));
      dispatch(setErrorEmail(''));
      dispatch(setErrorPass(''));
      return setIsLoginPage(true);
    }
    dispatch(changePageAuth(false));
    dispatch(setErrorEmail(''));
    dispatch(setErrorPass(''));
    return setIsLoginPage(false);
  };

  return (
    <main className="main">
      <div className="auth">
        <h1 className="auth__h1">Create account</h1>
        {!changeSigninSignUp ? <SignUp /> : <Login />}
        <hr className="auth__hr" />
        <p className="auth__text">
          {!changeSigninSignUp ? 'Already have an account? ' : 'Don’t have an account? '}
          <span className="auth__login" onClick={changePage}>
            {!changeSigninSignUp ? 'Login' : 'Registred'}
          </span>
        </p>
      </div>
    </main>
  );
}

export default UserAuth;
