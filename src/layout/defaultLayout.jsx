import React, { Component } from 'react';
import { Left, Main, Top } from '../component';

class DefaultLayout extends Component {
  render () {
    return (
      <div className="x-index">
        <div className="x-top">
          <Top { ...this.props } />
        </div>
        <div className="x-left">
          <Left { ...this.props }/>
        </div>
        <div className="x-main">
          <Main { ...this.props }/>
        </div>
      </div>
    )
  }
}

export default DefaultLayout;