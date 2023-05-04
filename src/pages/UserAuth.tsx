import React from 'react';
import Form from '../components/formComponents/form';
import '../components/formComponents/form.scss';
import SignUp from '../components/formComponents/signUp';

function UserAuth() {
  return (
    <>
      <h1 className="h1-form">Sign Up</h1>
      <SignUp />
    </>
  );
}

export default UserAuth;
