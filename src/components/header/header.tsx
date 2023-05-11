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

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) navigate('/auth');
  }, [loading, navigate, user]);

  const onClick = () => {
    logout();
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
      <button className="header__btn" type="submit" onClick={onClick}>
        LogOut
      </button>
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
          <button className="header__btn" type="submit">
            <Link className="header__link" to="/graphiql">
              GraphiQL
            </Link>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
