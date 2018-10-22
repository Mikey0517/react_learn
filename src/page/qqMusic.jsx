import React, { Component } from 'react';
import { Layout } from 'element-react';
import { TopList, MusicList } from '../component';
import '../assets/css/music.css';

class QqMusic extends Component {
  render () {
    return (
      <div
        className="qqMusic"
      >
        <Layout.Row>
          <Layout.Col 
            lg={ { span: 4, offset: 3 } }
            md={ { span: 4, offset: 3 } }
            sm={ { span: 6 } }
          >
            <TopList />
          </Layout.Col>
          <Layout.Col 
            lg={ { span: 14 } }
            md={ { span: 14 } }
            sm={ { span: 18 } }
          >
            111
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default QqMusic;