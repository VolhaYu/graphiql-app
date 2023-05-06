import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase';
import './header.scss';
import MyButton from '../formComponents/MyButton';
import { useAppDispatch, useAuth } from '../../store/hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, email } = useAuth();
  const [user, loading, error] = useAuthState(auth);

  const onClick = () => {
    logout();
    // dispatch(
    //   setUser({
    //     email: null,
    //     id: null,
    //     token: null,
    //   })
    // );
    navigate('/auth');
  };

  return (
    <header className="header">
      <button type="submit" onClick={onClick}>
        Go Out
      </button>
      <button type="submit">
        {user ? <Link to="/graphiql">graphiql</Link> : <Link to="/auth">Sign In/Sign up</Link>}
      </button>
      {/* <div>
        {!isAuth ? (
          <>
            <button type="submit">
              <Link to="/auth">sign In</Link>
            </button>
            <button type="submit">
              <Link to="/auth">sign up</Link>
            </button>
          </>
        ) : (
          <button type="submit">
            <Link to="/graphiql">main Page</Link>
          </button>
        )}
      </div> */}
    </header>
  );
}

export default Header;
