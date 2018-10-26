import React, { Component } from 'react';
import { Layout, Notification } from 'element-react';
import Progress from './progress.jsx';
import { eventListener, sendEvent } from '../../common';

const url = {
  play: "http://ws.stream.qqmusic.qq.com/C100"
}

class PlayMusic extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      status: 'pause',
      prev: false,
      next: false,
      music: null,
      progress: 0,
      volume: 0.5,
      nowtime: '00:00'
    };
    this.interval = null;
    this.musics = { lastIndex: -1, sort: [], list: {} };
  }

  componentWillMount () {
    eventListener( 'playMusic', ( key, param ) => {
      if ( !this.musics.list[ '_' + param.songmid ] ) {
        this.musics.sort.push( '_' + param.songmid );
        this.musics.list[ '_' + param.songmid ] = param;
        this.musics.lastIndex =  this.musics.sort.length - 1;
      } else {
        this.musics.lastIndex = this.musics.sort.indexOf( '_' + param.songmid );
      }
      localStorage.setItem( 'musics', JSON.stringify( this.musics ) );
      this.initData( () => {
        this.handleControl( 'play', true );
      } )
    } );
    if ( localStorage.hasOwnProperty( 'musics' ) ) {
      this.musics = JSON.parse( localStorage.getItem( 'musics' ) );
      this.initData();
    }
  }

  initData ( callback ) {
    const { lastIndex, sort, list } = this.musics;
    this.setState( { music: list[ sort[ lastIndex ] ], prev: lastIndex > 0 || false, next: ( lastIndex < sort.length - 1 && lastIndex > -1 ) || false }, () => {
      if ( callback ) callback();
    } )
  }

  getMusicUrl ( id ) {
    return url.play + id + ".m4a?fromtag=0&guid=126548448";
  }

  handleControl ( cmd, param ) {
    const { audio } = this.refs;
    const { music, volume } = this.state;
    const { lastIndex, sort } = this.musics;
    switch ( cmd ) {
      case 'play':
        if ( !music ) return false;
        let obj = { status: cmd };
        if ( param ) obj.progress = 0;
        this.setState( obj, () => {
          audio.volume = volume;
          audio.play();
          this.listenerAudio();
        } );
        break;
      case 'pause':
        this.setState( { status: cmd }, () => {
          audio.pause();
          if ( this.interval !== null ) clearInterval( this.interval );
        } );
        break;
      case 'prev': 
        this.musics.lastIndex--;
      case 'next':
        if ( cmd === 'next' ) this.musics.lastIndex++;
        localStorage.setItem( 'musics', JSON.stringify( this.musics ) );
        this.initData( () => {
          this.handleControl( 'play', true );
        } );
        break;
      case 'progress':
        audio.currentTime = param;
        break;
      case 'volume':
        this.setState( { volume: param }, () => {
          audio.volume = param;
        } )
        break;
      case 'end': 
        this.handleControl( 'pause' );
        this.setState( { progress: 0, nowtime: '00:00' }, () => {
          if ( lastIndex < sort.length - 1 ) {
            this.handleControl( 'next' );
          }
        } );
    }
  }

  formatTime ( time ) {
    let minute = Math.floor( time / 60 );
    let second = Math.round( time % 60 );
    return this.dealZero( minute ) + ':' + this.dealZero( second )
  }

  dealZero ( number ) {
    return number > 9 ? number : '0' + number;
  }

  listenerAudio () {
    if ( this.interval !== null ) clearInterval( this.interval );
    const { audio } = this.refs;
    this.interval = setInterval( () => {
      if ( audio.error ) {
        Notification( {
          title: '错误',
          message: '播放错误'
        } );
        this.handleControl( 'end' );
        return false;
      }
      if ( audio.ended ) {
        this.handleControl( 'end' );
      } else {
        this.setState( { progress: audio.currentTime, nowtime: this.formatTime( audio.currentTime ) } )
      }
    }, 500 )
  }

  render () {
    const { status, prev, next, music, progress, volume, nowtime } = this.state;
    return (
      <div className="playMusic">
        <audio ref="audio" src={ music ? this.getMusicUrl( music.songmid ) : null } />
        <div className="music-control">
          <Layout.Row type="flex">
            <Layout.Col 
              lg={ { span: 4 } }
            >
              <div className="control-button">
                <div className={ 'prev' + ( prev ? '' : ' disabled' ) } title="上一首" onClick={ this.handleControl.bind( this, 'prev' ) } />
                <div className={ status + ( music ? '' : ' disabled' ) } title={ status === 'play' ? '播放' : '暂停' } onClick={ this.handleControl.bind( this, status === 'play' ? 'pause' : 'play' ) } />
                <div className={ 'next' + ( next ? '' : ' disabled' ) } title="下一首" onClick={ this.handleControl.bind( this, 'next' ) } />
              </div>
            </Layout.Col>
            <Layout.Col
              lg={ { span: 16 } }
            >
              <div className="music-progress">
                <div className="songname">{ music ? music.songname : '' }</div>
                <div className="singtime">{ nowtime + ' / ' + ( music ? this.formatTime( music.interval ) : '00:00' ) }</div>
                <Progress 
                  numerator={ progress }
                  denominator={ music ? music.interval : 0 }
                  onClick={ this.handleControl.bind( this, 'progress' ) }
                />
              </div>
            </Layout.Col>
            <Layout.Col
              lg={ { span: 4 } }
            >
              <div className="music-volume">
                <div className="volume"/>
                <Progress 
                  numerator={ volume }
                  denominator={ 1 }
                  onClick={ this.handleControl.bind( this, 'volume' ) }
                  showFormat={ ( value ) => {
                    return Math.round( value * 100 )
                  } }
                />
              </div>
            </Layout.Col>
          </Layout.Row>
        </div>
      </div>
    )
  }
}

export default PlayMusic;