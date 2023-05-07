import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import Form from './form';

function SignUp() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/graphiql');
  }, [user, loading, navigate]);

  const handleRegisret = (email: string, password: string) => {
    registerWithEmailAndPassword(email, password);
  };
  return <Form title="Register" handleClick={handleRegisret} />;
}

export default SignUp;
