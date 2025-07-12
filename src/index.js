import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-awesome-lightbox/build/style.css';
import './utils/i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
