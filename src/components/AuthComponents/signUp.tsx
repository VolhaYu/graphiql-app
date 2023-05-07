import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import Form from './form';
import { setError } from '../../store/reducers/authSlice';

function SignUp() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const handleRegisret = (email: string, password: string) => {
    registerWithEmailAndPassword(email, password);
    if (user) navigate('/graphiql');
    // navigate('/graphiql');
  };
  return <Form title="Register" handleClick={handleRegisret} />;
}

export default SignUp;
