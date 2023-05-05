import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setError, setUser } from '../../store/reducers/authSlice';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRegisret = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            emailErr: null,
            passErr: null,
          })
        );
        navigate('/graphiql');
      })
      .catch((e) => {
        dispatch(
          setError({
            emailErr: e.message,
            passErr: e.message,
          })
        );
      });
  };
  return (
    <div>
      <Form title="register" handleClick={handleRegisret} />
    </div>
  );
}

export default SignUp;
