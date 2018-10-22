import React, { Component } from 'react';
import { Left, Main } from './component'

class App extends Component {
  render () {
    return (
      <div
        className="x-index"
      >
        <Left 
          { ...this.props }
        />
        <Main 
          { ...this.props }
        />
      </div>
    )
  }
}

export default App;