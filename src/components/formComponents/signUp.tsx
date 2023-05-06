import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, registerWithEmailAndPassword } from '../../firebase';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setError, setUser } from '../../store/reducers/authSlice';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   if (loading) return;
  //   // if (user) history.replace('/graphiql');
  // }, [user, loading]);

  const handleRegisret = (email: string, password: string) => {
    registerWithEmailAndPassword(email, password);
    createUserWithEmailAndPassword(auth, email, password);
    navigate('/graphiql');
    // .then(({ user }) => {
    //   dispatch(
    //     setUser({
    //       email: user.email,
    //       id: user.uid,
    //       token: user.refreshToken,
    //       emailErr: null,
    //       passErr: null,
    //     })
    //   );
    //   navigate('/graphiql');
    // })
    // .catch((e) => {
    //   dispatch(
    //     setError({
    //       emailErr: e.message,
    //       passErr: e.message,
    //     })
    //   );
    // });
  };
  return (
    <div>
      <Form title="register" handleClick={handleRegisret} />
    </div>
  );
}

export default SignUp;
