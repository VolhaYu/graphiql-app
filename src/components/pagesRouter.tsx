import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuth from '../pages/UserAuth';
import NotFound from '../pages/NotFound';
import WelcomePage from '../pages/WelcomePage';
import GraphiQlPage from '../pages/GraphiQLPage/GraphiQLPage';

function PagesRouter() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/auth" element={<UserAuth />} />
      <Route path="/graphiql" element={<GraphiQlPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PagesRouter;
