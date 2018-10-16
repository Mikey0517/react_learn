import ReactDom from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';

import 'element-theme-default';
import './assets/css/common.css'

ReactDom.render( 
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector( '#root' )
)