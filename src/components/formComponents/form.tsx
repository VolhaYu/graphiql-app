/* eslint-disable react/function-component-definition */
import React, { FC, SyntheticEvent, useState } from 'react';
import './form.scss';
import MyInput from './MyInput';
import MyButton from './MyButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { authSlice } from '../../store/reducers/authSlice';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}
const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorFormValue, setErrorFormValue] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  // const changeName = (e: React.SyntheticEvent<HTMLInputElement>) => {
  //   dispatch(addName(e.currentTarget.value));
  //   const regName = /^[A-ZА-ЯЁ]{1}[a-zа-яё]+$/;
  //   if (name && !regName.test(name) && name.length < 4) {
  //     setErrorFormValue({ ...errorFormValue, nameError: 'Start with a capital letter!' });
  //   } else {
  //     setErrorFormValue({ ...errorFormValue, nameError: '' });
  //   }
  // };

  // const changeEmail = (e: React.SyntheticEvent<HTMLInputElement>) => {
  //   dispatch(addEmail(e.currentTarget.value));
  //   const regEmail = /\S+@\S+\.\S+/;
  //   if (email && !regEmail.test(email)) {
  //     setErrorFormValue({ ...errorFormValue, emailError: 'Please enter a valid e-mail' });
  //   } else {
  //     setErrorFormValue({ ...errorFormValue, emailError: '' });
  //   }
  // };

  // const changePassword = (e: React.SyntheticEvent<HTMLInputElement>) => {
  //   dispatch(addPassword(e.currentTarget.value));
  //   if (password && password.length < 8) {
  //     setErrorFormValue({
  //       ...errorFormValue,
  //       passwordError: 'Password must contain at least 8 characters',
  //     });
  //   } else {
  //     setErrorFormValue({ ...errorFormValue, passwordError: '' });
  //   }
  // };

  const handlerSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <form className="form" onSubmit={handlerSubmit}>
      {errorFormValue.nameError.length > 0 && (
        <div className="form__error">{errorFormValue.nameError}</div>
      )}
      <MyInput
        label="Name:"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      {errorFormValue.emailError.length > 0 && (
        <div className="form__error">{errorFormValue.emailError}</div>
      )}
      <MyInput
        label="E-mail:"
        type="email"
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
