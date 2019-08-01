import React, { Component } from 'react';
import DefaultLayout from '../layout/defaultLayout';
import { MineSweepingPanel } from '../component';
import '../assets/css/mineSweeping.css';

class MineSweeping extends Component {
  render () {
    return (
      <DefaultLayout { ...this.props }>
        <div className='mine-sweeping'>
          <MineSweepingPanel />
        </div>
      </DefaultLayout>
    )
  }
}

export default MineSweeping;