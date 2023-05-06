import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   if (loading) {
  //     // maybe trigger a loading screen
  //     return;
  //   }
  //   // if (user) navigate('/graphiql');
  // }, [user, loading]);

  const handleLogin = (email: string, password: string) => {
    logInWithEmailAndPassword(email, password);
    if (user) navigate('/graphiql');
    // .then(({ user }) => {
    //   dispatch(
    //     setUser({
    //       email: user.email,
    //       id: user.uid,
    //       token: user.refreshToken,
    //     })
    //   );
    //   navigate('/graphiql');
    // })
    // .catch((e) => console.log(e.message));
  };
  return (
    <div>
      <Form title="sign in" handleClick={handleLogin} />
    </div>
  );
}

export default Login;
