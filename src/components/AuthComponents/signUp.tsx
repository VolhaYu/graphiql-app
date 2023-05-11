import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';

export interface Error {
  message: string;
  code: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

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
          setErrorMessage('The password is too weak.');
          break;
        case 'auth/email-already-in-use':
          setErrorMessage('This email address is already in use by another account.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('This email address is invalid.');
          break;
        case 'auth/operation-not-allowed':
          setErrorMessage('Email/password accounts are not enabled.');
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
      dispatch(setErrorEmail('Please, enter a valid e-mail'));
    } else {
      dispatch(setErrorEmail(''));
    }
    if (!regPass.test(password)) {
      dispatch(
        setErrorPass(
          'Password must contain minimum 8 symbols, at least one letter, one digit, one special character'
        )
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
      <Form title="Register" handleClick={handleRegisret} />;
    </>
  );
}

export default SignUp;
