import React, { useState } from 'react';
import './UserAuth.scss';
import { useTranslation } from 'react-i18next';
import SignUp from '../../components/AuthComponents/signUp';
import Login from '../../components/AuthComponents/login';
import { useAppDispatch, useAuth } from '../../store/hooks/redux';
import { changePageAuth, setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';

function UserAuth() {
  const { t } = useTranslation();

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
        {!changeSigninSignUp ? (
          <h1 className="auth__h1">{t('description.Auth1')}</h1>
        ) : (
          <h1 className="auth__h1">{t('description.Auth2')}</h1>
        )}
        {!changeSigninSignUp ? <SignUp /> : <Login />}
        <hr className="auth__hr" />
        {!changeSigninSignUp ? (
          <p className="auth__text">
            {t('description.Auth5')}
            <span className="auth__login" onClick={changePage}>
              {t('description.Header1')}
            </span>
          </p>
        ) : (
          <p className="auth__text">
            {t('description.Auth6')}
            <span className="auth__login" onClick={changePage}>
              {t('description.Header2')}
            </span>
          </p>
        )}
      </div>
    </main>
  );
}

export default UserAuth;
