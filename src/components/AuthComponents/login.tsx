import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { Translation, useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Form from './form';
import { setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import '../../i18n';

export interface Error {
  message: string;
  code: string;
}

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/graphiql/');
  }, [user, loading, navigate, error]);

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const errMessage = (err as Error).message;
      const errorCode = (err as Error).code;

      switch (errorCode) {
        case 'auth/invalid-email':
          setErrorMessage(i18next.t('description.invalid-email') as string);
          break;
        case 'auth/user-disabled':
          setErrorMessage(i18next.t('description.user-disabled') as string);
          // setErrorMessage('This email address is disabled by the administrator.');
          break;
        case 'auth/user-not-found':
          setErrorMessage(i18next.t('description.user-not-found') as string);
          // setErrorMessage('This email address is not registered.');
          break;
        case 'auth/wrong-password':
          setErrorMessage(i18next.t('description.wrong-password') as string);
          // setErrorMessage('The password is invalid or the user does not have a password.');
          break;
        default:
          setErrorMessage(errMessage);
          break;
      }
    }
  };

  const validForm = (email: string, password: string) => {
    if (!email) {
      dispatch(setErrorEmail(i18next.t('description.!email') as string));
    } else {
      dispatch(setErrorEmail(''));
    }
    if (!password) {
      dispatch(setErrorPass(i18next.t('description.!password') as string));
    } else {
      dispatch(setErrorPass(''));
    }
    if (email.length > 0 || password.length > 0) {
      logInWithEmailAndPassword(email, password);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    validForm(email, password);
  };

  return (
    <>
      {errorMessage && <div className="form__error">{errorMessage}</div>}
      <Form title={t('description.Header1')} handleClick={handleLogin} />
    </>
  );
}

export default Login;
