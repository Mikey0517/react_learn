import React, { Component } from 'react';
import { Left, Main } from '../component';

class DefalutLayout extends Component {
  render () {
    return (
      <div className="x-index">
        <Left { ...this.props }/>
        <Main { ...this.props }/>
      </div>
    )
  }
}

export default DefalutLayout;