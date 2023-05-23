import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import { setupStore } from './store/store';
import './firebase';
import './i18n';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);
