import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Layout />
    </BrowserRouter>

    {/* </React.StrictMode> */}
  </Provider>
);


reportWebVitals();
