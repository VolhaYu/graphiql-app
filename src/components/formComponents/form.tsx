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
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  const { emailErr, passErr } = useAuth();

  const changeEmail = () => {
    const regEmail = /\S+@\S+\.\S+/;
    if (!email) {
      setErrorEmail('Enter e-mail');
    } else if (!regEmail.test(email)) {
      setErrorEmail('Please, enter a valid e-mail');
    } else {
      setErrorEmail('');
    }
  };

  const changePassword = () => {
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;
    console.log('соответствует регулярке?', reg.test(pass));
    if (!pass) {
      setErrorPass('Enter password');
    } else if (!reg.test(pass)) {
      setErrorPass(
        'Password must contain minimum 8 symbols, at least one letter, one digit, one special character'
      );
    } else {
      setErrorPass('');
    }
  };

  const handlerSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    changeEmail();
    changePassword();
  };
  return (
    <form className="form" onSubmit={handlerSubmit}>
      {errorEmail && <div className="form__error">{errorEmail}</div>}
      <MyInput
        label="E-mail:"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      {errorPass && <div className="form__error">{errorPass}</div>}
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
