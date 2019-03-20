import React, { Component } from 'react';
import DefaultLayout from '../layout/defaultLayout';
import { Layout } from 'element-react';
import { TopList, MusicMain, PlayMusic, PlayList } from '../component';
import '../assets/css/music.css';

class QqMusic extends Component {
  render () {
    return (
      <DefaultLayout { ...this.props }>
        <div className="qqMusic">
          <Layout.Row>
            <Layout.Col 
              lg={ { span: 4, offset: 3 } }
              md={ { span: 4, offset: 3 } }
              sm={ { span: 6 } }
            >
              <TopList { ...this.props } />
            </Layout.Col>
            <Layout.Col 
              lg={ { span: 14 } }
              md={ { span: 14 } }
              sm={ { span: 18 } }
            >
              <MusicMain 
                id={ 4 }
              />
            </Layout.Col>
          </Layout.Row>
          <PlayList />
          <PlayMusic />
        </div>
      </DefaultLayout>
    )
  }
}

export default QqMusic;