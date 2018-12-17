import React, { Component } from 'react';
import RouteWithSubRoutes from './component/routeWithSubRoutes'

class App extends Component {
  render () {
    return (
      <RouteWithSubRoutes { ...this.props } />
    )
  }
}

export default App;