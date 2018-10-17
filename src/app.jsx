import React, { Component } from 'react';
import { Layout } from 'element-react';
import { Left, Main } from './component'

class App extends Component {
  render () {
    return (
      <Layout.Row>
        <Layout.Col span={ 4 }>
          <Left 
            { ...this.props }
          />
        </Layout.Col>
        <Layout.Col span={ 20 }>
          <Main 
            { ...this.props }
          />
        </Layout.Col>
      </Layout.Row>
    )
  }
}

export default App;