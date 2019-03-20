import ReactDom from 'react-dom';
import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from './app.jsx';

import 'element-theme-default';
import './assets/css/common.css';

const supportsHistory = 'pushState' in window.history;

ReactDom.render( 
  <BrowserRouter
    basename={ '/' }
    forceRefresh={ !supportsHistory }
    keyLength={ 12 }
  >
    <App />
  </BrowserRouter>,
  document.querySelector( '#root' )
)