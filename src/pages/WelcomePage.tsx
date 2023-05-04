import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div>
      <h1>Welcome Page</h1>
      <button type="submit">
        <Link to="/auth">sign up</Link>
      </button>
    </div>
  );
}

export default WelcomePage;
