import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { persistedStore, store } from 'redux/store';

import App from './App';

import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

import 'react-datepicker/dist/react-datepicker.css';
import 'styles/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}>
          <ScrollToTop />
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
