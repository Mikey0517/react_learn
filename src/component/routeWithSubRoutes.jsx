import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from '../router';

class RouteWithSubRoutes extends Component {
  render () {
    return (
      [
        <Route
          key={ -1 }
          path={ '/' }
          exact
          render={ ( props ) => (
            <Redirect
              to={ {
                pathname: routes[ 0 ].path,
                state: { from: props.location }
              } }
            />
          ) }
        />
      ].concat( 
        routes.map( ( route, index ) => {
          return (
            <Route 
              key={ index }
              path={ route.path }
              component={ route.component }
            />
          )
        } )
      )
    )
  }
}

export default RouteWithSubRoutes;