import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import PagesRouter from './components/pagesRouter';

function App() {
  return (
    <BrowserRouter>
      <PagesRouter />
    </BrowserRouter>
  );
}

export default App;
