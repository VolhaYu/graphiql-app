import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';
import '../../i18n';

export interface Error {
  message: string;
  code: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const { t } = useTranslation('translation', { useSuspense: true });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/graphiql');
  }, [user, loading, navigate]);

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {
        uid: user!.uid,
        authProvider: 'local',
        email,
      });
    } catch (err) {
      const errMessage = (err as Error).message;
      const errorCode = (err as Error).code;

      switch (errorCode) {
        case 'auth/weak-password':
          setErrorMessage(t('description.weak-password') as string);
          // setErrorMessage('The password is too weak.');
          break;
        case 'auth/email-already-in-use':
          setErrorMessage(i18next.t('description.email-already') as string);
          // setErrorMessage('This email address is already in use by another account.');
          break;
        case 'auth/invalid-email':
          setErrorMessage(i18next.t('description.invalid-email') as string);
          // setErrorMessage('This email address is invalid.');
          break;
        case 'auth/operation-not-allowed':
          setErrorMessage(i18next.t('description.not-allowed') as string);
          // setErrorMessage('Email/password accounts are not enabled.');
          break;
        default:
          setErrorMessage(errMessage);
          break;
      }
    }
  };

  const validForm = (email: string, password: string) => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;
    const regEmail = /\S+@\S+\.\S+/;
    if (!regEmail.test(email)) {
      dispatch(setErrorEmail(i18next.t('description.validEmail') as string));
      // dispatch(setErrorEmail('Please, enter a valid e-mail'));
    } else {
      dispatch(setErrorEmail(''));
    }
    if (!regPass.test(password)) {
      dispatch(
        setErrorPass(i18next.t('description.validPassword') as string)
        // setErrorPass(
        //   'Password must contain minimum 8 symbols, at least one letter, one digit, one special character'
        // )
      );
    } else {
      dispatch(setErrorPass(''));
    }
    if (regPass.test(password) && regEmail.test(email)) {
      registerWithEmailAndPassword(email, password);
    }
  };

  const handleRegisret = async (email: string, password: string) => {
    validForm(email, password);
  };

  return (
    <>
      {errorMessage && <div className="form__error">{errorMessage}</div>}
      <Form title={t('description.Header2')} handleClick={handleRegisret} />
    </>
  );
}

export default SignUp;
