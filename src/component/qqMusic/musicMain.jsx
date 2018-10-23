import React, { Component } from 'react';
import { Layout } from 'element-react';
import MusicList from './musicList.jsx';
import { eventListener, isEqual } from '../../common';

class MusicMain extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      id: null,
      topTitle: null,
    };
  }

  componentWillMount () {
    eventListener( 'changeList', ( key, param ) => {
      this.setState( { id: param.id, topTitle: param.topTitle } )
    } )
  }

  shouldComponentUpdate ( nextProps, nextState ) {
    let res = false;
    if ( !isEqual( this.state, nextState ) ) {
      res = true;
    }
    return res;
  }

  render () {
    const { id, topTitle } = this.state;
    if ( !id ) return null;
    return (
      <div className="music-main">
        <Layout.Row>
          <div className="music-top-title">{ topTitle }</div>
        </Layout.Row>
        <Layout.Row>
          <MusicList
            id={ id }
          />
        </Layout.Row>
      </div>
    )
  }
}

export default MusicMain;