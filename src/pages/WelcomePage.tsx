import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/hooks/redux';

function WelcomePage() {
  const { isAuth, email } = useAuth();
  const user = localStorage.getItem(`{email}`);
  console.log(user);
  console.log(isAuth);
  return (
    <div>
      <h1>Welcome Page</h1>
      <button type="submit">
        {user === email ? <Link to="/graphiql">graphiql</Link> : <Link to="/auth">sign up</Link>}
      </button>
    </div>
  );
}

export default WelcomePage;
