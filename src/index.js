import ReactDom from 'react-dom';
import React from 'react';
import App from './app.jsx';

import 'element-theme-default';
import './assets/css/common.css';

ReactDom.render( 
  <App />,
  document.querySelector( '#root' )
)