/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase';
import './header.scss';
import { useAppDispatch } from '../../store/hooks/redux';
import { changePageAuth, setErrorEmail, setErrorPass } from '../../store/reducers/authSlice';

interface Locale {
  [key: string]: { title: string };
}

function Header() {
  const { t, i18n } = useTranslation();
  const locales: Locale = {
    en: { title: 'EN' },
    ru: { title: 'RU' },
  };

  const changeLanguage = (locale: string) => {
    localStorage.setItem('lang', locale);
    i18n.changeLanguage(locale);
  };

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
    if (!user && currentPath === '/graphiql/') navigate('/auth');
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
  const openWelcomePage = () => {
    navigate('/');
  };

  return (
    <header className={scrollPosition === 0 ? 'header' : 'header header-sticky'}>
      <h1 onClick={openWelcomePage} className="header__h1">
        GRAPHIQL-APP
      </h1>
      <div>
        {Object.keys(locales).map((locale) => (
          <button
            key={locale}
            style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}
            className="lngs-btn"
            type="submit"
            onClick={() => changeLanguage(locale)}
          >
            {locales[locale].title}
          </button>
        ))}
      </div>
      <div>
        {!user ? (
          <>
            <button className="header__btn" type="submit" onClick={openSignIn}>
              <Link className="header__link" to="/auth">
                {t('description.Header1')}
              </Link>
            </button>
            <button className="header__btn" type="submit" onClick={openSignUp}>
              <Link className="header__link" to="/auth">
                {t('description.Header2')}
              </Link>
            </button>
          </>
        ) : (
          <button className="header__btn" type="submit" onClick={onClick}>
            {t('description.Header3')}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
