import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from './components/pagesRouter';
import Header from './components/header/header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PagesRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
