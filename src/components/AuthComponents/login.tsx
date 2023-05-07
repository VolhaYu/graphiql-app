import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import Form from './form';

function Login() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/graphiql');
  }, [user, loading, navigate]);

  const handleLogin = (email: string, password: string) => {
    logInWithEmailAndPassword(email, password);
  };

  return <Form title="Login" handleClick={handleLogin} />;
}

export default Login;
