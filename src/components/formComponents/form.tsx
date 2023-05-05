import React, { SyntheticEvent, useState } from 'react';
import './form.scss';
import MyInput from './MyInput';
import MyButton from './MyButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { authSlice } from '../../store/reducers/authSlice';

function Form() {
  const [errorFormValue, setErrorFormValue] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  const { name, email, password } = useAppSelector((state) => state.authReducer);
  const { addName, addEmail, addPassword } = authSlice.actions;
  const dispatch = useAppDispatch();

  const changeName = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(addName(e.currentTarget.value));
    const regName = /^[A-ZА-ЯЁ]{1}[a-zа-яё]+$/;
    if (!regName.test(name) && name.length < 4) {
      setErrorFormValue({ ...errorFormValue, nameError: 'Start with a capital letter!' });
    } else {
      setErrorFormValue({ ...errorFormValue, nameError: '' });
    }
  };

  const changeEmail = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(addEmail(e.currentTarget.value));
    const regEmail = /\S+@\S+\.\S+/;
    if (!regEmail.test(email)) {
      setErrorFormValue({ ...errorFormValue, emailError: 'Please enter a valid e-mail' });
    } else {
      setErrorFormValue({ ...errorFormValue, emailError: '' });
    }
  };

  const changePassword = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(addPassword(e.currentTarget.value));
    if (password.length < 8) {
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
  };
  return (
    <form className="form" onSubmit={handlerSubmit}>
      {errorFormValue.nameError.length > 0 && (
        <div className="form__error">{errorFormValue.nameError}</div>
      )}
      <MyInput label="Name:" type="text" placeholder="name" onChange={changeName} />
      {errorFormValue.emailError.length > 0 && (
        <div className="form__error">{errorFormValue.emailError}</div>
      )}
      <MyInput label="E-mail:" type="email" placeholder="email" onChange={changeEmail} />
      {errorFormValue.passwordError.length > 0 && (
        <div className="form__error">{errorFormValue.passwordError}</div>
      )}
      <MyInput label="Password:" type="password" placeholder="password" onChange={changePassword} />
      <MyButton>Register</MyButton>
    </form>
  );
}

export default Form;
