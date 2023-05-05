/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import '../components/formComponents/form.scss';
import SignUp from '../components/formComponents/signUp';
import Login from '../components/formComponents/login';

function UserAuth() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const changePage = () => {
    return !isLoginPage ? setIsLoginPage(true) : setIsLoginPage(false);
  };

  return (
    <>
      <h1 className="form__h1">Create account</h1>
      {!isLoginPage ? <SignUp /> : <Login />}
      <hr className="form__hr" />
      <p className="form__text">
        Already have an account?{' '}
        <span className="form__login" onClick={changePage}>
          {!isLoginPage ? 'Log in' : 'registred'}
        </span>
      </p>
    </>
  );
}

export default UserAuth;
