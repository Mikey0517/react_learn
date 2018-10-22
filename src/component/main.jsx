import React, { Component } from 'react';
import RouteWithSubRoutes from './routeWithSubRoutes.jsx'

class Main extends Component {
  render () {
    return (
      <div
        className="x-main"
      >
        <RouteWithSubRoutes 
          { ...this.props }
        />
      </div>
    )
  }
}

export default Main;