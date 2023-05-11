import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function WelcomePage() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <h1 className="welcome-page__h1">Welcome Page</h1>
      <button type="submit" className="welcome-page__btn">
        {user ? <Link to="/graphiql">graphiql</Link> : <Link to="/auth">Sign In/Sign up</Link>}
      </button>
    </div>
  );
}

export default WelcomePage;
