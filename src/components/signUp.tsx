import React from 'react';
import { useNavigate } from 'react-router-dom';

import { registerWithEmailAndPassword } from '../firebase';
import Form from './formComponents/form';
import { setError } from '../store/reducers/authSlice';

function SignUp() {
  const navigate = useNavigate();

  const handleRegisret = (email: string, password: string) => {
    registerWithEmailAndPassword(email, password);
    navigate('/graphiql');
  };
  return (
    <div>
      <Form title="Register" handleClick={handleRegisret} />
    </div>
  );
}

export default SignUp;
