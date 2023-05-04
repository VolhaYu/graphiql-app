import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

function SignUp() {
  const dispatch = useAppDispatch();
  const handleRegisret = (email: string, password: string) => {
    console.log('auth');
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password).then(console.log).catch(console.error);
  };
  return (
    <div>
      <Form title="register" handleClick={handleRegisret} />
    </div>
  );
}

export default SignUp;
