import ReactDom from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from './app.jsx';

import 'element-theme-default';
import './assets/css/common.css';

const supportsHistory = 'pushState' in window.history;

ReactDom.render( 
  <HashRouter
    basename={ '/' }
    forceRefresh={ !supportsHistory }
    keyLength={ 12 }
  >
    <App />
  </HashRouter>,
  document.querySelector( '#root' )
)