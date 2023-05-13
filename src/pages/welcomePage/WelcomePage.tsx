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
      <h1 className="welcome-page__h1">{t('description.WelcPage1')}</h1>
      <button type="submit" className="welcome-page__btn">
        {user ? (
          <Link className="welcome-page__link" to="/graphiql">
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
