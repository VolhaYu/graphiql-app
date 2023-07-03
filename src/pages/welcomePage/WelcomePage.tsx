import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import './welcomePage.scss';

function WelcomePage() {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  return (
    <main className="main">
      <h1 className="welcome-page__h1">GraphQL</h1>
      <h3 className="welcome-page__h3">{t('description.WelcPage1')}</h3>
      <p className="welcome-page__text">
        {t('description.WelcPage4')}
        <Link to="https://rickandmortyapi.com/">{t('description.WelcPage5')}</Link>
      </p>
      <p className="welcome-page__text">
        {t('description.WelcPage6')}
        <Link to="https://rs.school/index.html">The Rolling Scopes School</Link>
      </p>
      <p className="welcome-page__text">{t('description.WelcPage7')}</p>
      <button type="submit" className="welcome-page__btn">
        {user ? (
          <Link className="welcome-page__link" to="/graphiql/">
            {t('description.WelcPage3')}
          </Link>
        ) : (
          <Link className="welcome-page__link" to="/auth">
            {t('description.WelcPage2')}
          </Link>
        )}
      </button>
    </main>
  );
}

export default WelcomePage;
