import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from './form';
import { useAppDispatch } from '../../store/hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        localStorage.setItem(`${email}`, email);
        navigate('/graphiql');
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <div>
      <Form title="sign in" handleClick={handleLogin} />
    </div>
  );
}

export default Login;
