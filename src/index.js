import ReactDom from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './app.jsx';

import 'element-theme-default';
import './assets/css/common.css';

const supportsHistory = 'pushState' in window.history;

const history = createBrowserHistory();

ReactDom.render( 
  <BrowserRouter
    basename={ '/' }
    forceRefresh={ !supportsHistory }
    keyLength={ 12 }
  >
    <App 
      history={ history } 
    />
  </BrowserRouter>,
  document.querySelector( '#root' )
)