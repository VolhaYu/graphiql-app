/* eslint-disable react/function-component-definition */
import React, { FC, SyntheticEvent, useState } from 'react';
import './form.scss';
import MyInput from './MyInput';
import MyButton from './MyButton';
import { useAuth } from '../../store/hooks/redux';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}
const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorFormValue, setErrorFormValue] = useState({
    emailError: '',
    passwordError: '',
  });

  const { emailErr, passErr } = useAuth();

  const changeEmail = () => {
    const regEmail = /\S+@\S+\.\S+/;
    if (email.length > 0 && !regEmail.test(email)) {
      setErrorFormValue({ ...errorFormValue, emailError: 'Please enter a valid e-mail' });
    } else {
      setErrorFormValue({ ...errorFormValue, emailError: '' });
    }
  };

  const changePassword = () => {
    const reg = /\d{8,}/;
    if (pass.length === 0) {
      setErrorFormValue({
        ...errorFormValue,
        passwordError: 'errrooorr',
      });
    }
    if (pass.length > 0 && !reg.test(pass)) {
      setErrorFormValue({
        ...errorFormValue,
        passwordError: 'Password must contain at least 8 characters',
      });
    } else {
      setErrorFormValue({ ...errorFormValue, passwordError: '' });
    }
  };

  const handlerSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    changeEmail();
    changePassword();
  };
  return (
    <form className="form" onSubmit={handlerSubmit}>
      {errorFormValue.emailError.length > 0 && (
        <div className="form__error">{errorFormValue.emailError}</div>
      )}
      <MyInput
        label="E-mail:"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      {errorFormValue.passwordError.length > 0 && (
        <div className="form__error">{errorFormValue.passwordError}</div>
      )}
      <MyInput
        label="Password:"
        type="password"
        placeholder="password"
        value={pass}
        onChange={(e) => setPass(e.currentTarget.value)}
      />
      <MyButton onClick={() => handleClick(email, pass)}>{title}</MyButton>
    </form>
  );
};

export default Form;
