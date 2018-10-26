import React, { Component } from 'react';
import { Layout } from 'element-react';

class PlayList extends Component {
  render () {
    return (
      <div className="playList">
        <div className="list-top">
          <Layout.Row>
            <div className="list-title">播放列表</div>
          </Layout.Row>
          <Layout.Row type="flex" justify="space-between">
            <Layout.Col lg={ { span: 8 } }>
              <div className="list-number">48首歌曲</div>
            </Layout.Col>
            <Layout.Col lg={ { span: 8 } }>
              <div className="list-clear">清空</div>
            </Layout.Col>
          </Layout.Row>
        </div>
        <div className="list-content">
          <div className="list-item">
            <div className="song-introduce">
              <div className="songname ellipsis">胜多豆腐干地方豆腐干风格负少</div>
              <div className="singer ellipsis">士大夫</div>
            </div>
            <div className="songtime">03:20</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayList;