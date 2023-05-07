import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useAuth } from '../store/hooks/redux';
import MyButton from '../components/AuthComponents/MyButton';

function WelcomePage() {
  const { isAuth, email } = useAuth();
  const [user, loading, error] = useAuthState(auth);

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
