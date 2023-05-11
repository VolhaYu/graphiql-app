import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from './components/pagesRouter';
import Header from './components/header/header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PagesRouter />
    </BrowserRouter>
  );
}

export default App;
