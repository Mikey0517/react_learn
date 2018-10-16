import React, { Component } from 'react';
import { Layout } from 'element-react';
import Left from './component/left.jsx';

class App extends Component {
  render () {
    return (
      <div>
        <Layout.Row>
          <Layout.Col span={ 4 }>
            <Left />
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default App;