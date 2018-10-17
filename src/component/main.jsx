import React, { Component } from 'react';
import RouteWithSubRoutes from './routeWithSubRoutes.jsx'

class Main extends Component {
  render () {
    return (
      <RouteWithSubRoutes 
        { ...this.props }
      />
    )
  }
}

export default Main;