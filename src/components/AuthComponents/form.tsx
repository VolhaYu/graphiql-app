/* eslint-disable react/function-component-definition */
import React, { FC, SyntheticEvent, useState } from 'react';
import MyInput from './MyInput';
import MyButton from './MyButton';
import { useAppSelector } from '../../store/hooks/redux';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}
const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { errorEmail, errorPass } = useAppSelector((state) => state.authReducer);

  const handlerSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleClick(email, pass);
  };
  return (
    <form className="auth__form" onSubmit={handlerSubmit}>
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
      <MyButton>{title}</MyButton>
    </form>
  );
};

export default Form;
