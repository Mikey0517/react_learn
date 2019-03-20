import React, { Component } from 'react';
import DefaultLayout from '../layout/defaultLayout';

class ceshi extends Component {
  render () {
    return (
      <DefaultLayout { ...this.props }>
        <div>11</div>
      </DefaultLayout>
    )
  }
}

export default ceshi;