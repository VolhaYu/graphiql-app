import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Form from './form';
import { useAppDispatch, useAuth } from '../../store/hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const handleRegisret = (email: string, password: string) => {
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        console.log(isAuth);
        localStorage.setItem(`${email}`, email);
        navigate('/graphiql');
      })
      .catch(console.error);
  };
  return (
    <div>
      <Form title="register" handleClick={handleRegisret} />
    </div>
  );
}

export default SignUp;
