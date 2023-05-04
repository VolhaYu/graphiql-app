import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(console.log).catch(console.error);
  };
  return (
    <div>
      <Form title="sign in" handleClick={handleLogin} />
    </div>
  );
}

export default Login;
