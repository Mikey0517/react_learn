import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import routes from '../router';

const supportsHistory = 'pushState' in window.history;

class RouteWithSubRoutes extends Component {
  render () {
    return (
      <BrowserRouter
        basename={ '/' }
        forceRefresh={ !supportsHistory }
        keyLength={ 12 }
      >
        <div>
          {
            routes.map( ( route, index ) => (
              <Route 
                key={ index }
                path={ route.path }
                exact={ route.exact ? route.exact : false }
                component={ route.component }
              />
            ) )
          }
        </div>
      </BrowserRouter>
    )
  }
}

export default RouteWithSubRoutes;