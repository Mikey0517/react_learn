import React, { Component } from 'react';
import DefaultLayout from '../layout/defaultLayout';

class MineSweeping extends Component {
  render () {
    return (
      <DefaultLayout { ...this.props }>
        <div>1</div>
      </DefaultLayout>
    )
  }
}

export default MineSweeping;