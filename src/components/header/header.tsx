import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase';
import './header.scss';
import { useAppDispatch } from '../../store/hooks/redux';
import { changePageAuth, setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user && currentPath === '/graphiql') navigate('/auth');
  }, [loading, navigate, user, currentPath]);

  const onClick = () => {
    logout();
    navigate('/auth');
  };
  const openSignIn = () => {
    dispatch(changePageAuth(true));
    dispatch(setErrorEmail(''));
    dispatch(setErrorPass(''));
  };
  const openSignUp = () => {
    dispatch(changePageAuth(false));
    dispatch(setErrorEmail(''));
    dispatch(setErrorPass(''));
  };

  return (
    <header className={scrollPosition === 0 ? 'header' : 'header header-sticky'}>
      <h1 className="header__h1">GRAPHIQL-APP</h1>
      <div>
        {!user ? (
          <>
            <button className="header__btn" type="submit" onClick={openSignIn}>
              <Link className="header__link" to="/auth">
                Login
              </Link>
            </button>
            <button className="header__btn" type="submit" onClick={openSignUp}>
              <Link className="header__link" to="/auth">
                Register
              </Link>
            </button>
          </>
        ) : (
          <button className="header__btn" type="submit" onClick={onClick}>
            LogOut
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
