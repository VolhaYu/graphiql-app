import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../firebase';
import Form from './formComponents/form';

function Login() {
  const navigate = useNavigate();
  const [user, error] = useAuthState(auth);

  const handleLogin = (email: string, password: string) => {
    logInWithEmailAndPassword(email, password);
    if (user) navigate('/graphiql');
  };

  return (
    <>
      {error && <h3>{error}</h3>}
      <div>
        <Form title="Login" handleClick={handleLogin} />
      </div>
    </>
  );
}

export default Login;
