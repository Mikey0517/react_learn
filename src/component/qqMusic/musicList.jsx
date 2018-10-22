import React, { Component } from 'react';
import { $fetch } from '../../common';

class MusicItem extends Component {
  render () {
    return (
      <Layout.Row>
        <Layout.Col span={ 4 }>
          
        </Layout.Col>
      </Layout.Row>
    )
  }
}

class MusicList extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      musics: []
    };
  }  

  componentWillMount () {
    this.getData();
  }

  componentWillReceiveProps () {
    this.getData();
  }

  getData () {
    let url = "/api/v8/fcg-bin/fcg_myqq_toplist.fcg";
    let body = {
      g_tk: '1928093487',
      notice: 0,
      needNewCode: 1,
    };
    $fetch( url, 'POST', body, ( data ) => {
      this.setState( { musics: data.data } )
    } )
  }

  render () {
    return (
      <div>

      </div>
    )
  }
}

export default MusicList;