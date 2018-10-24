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
      singtime: '00:00',
      nowtime: '00:00'
    };
    this.interval = null;
  }

  componentWillMount () {
    eventListener( 'playMusic', ( key, param ) => {
      this.setState( { music: param, progress: 0, singtime: this.formatTime( param.interval ) }, () => {
        this.handleControl( 'play' );
      } )
    } )
  }

  getMusicUrl ( id ) {
    return url.play + id + ".m4a?fromtag=0&guid=126548448";
  }

  handleControl ( cmd, param ) {
    const { audio } = this.refs;
    const { music, volume } = this.state;
    switch ( cmd ) {
      case 'play':
        if ( !music ) return false;
        this.setState( { status: cmd }, () => {
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
      case 'next':
        if ( this.state[ cmd ] ) return false;
        sendEvent( 'toggleMusic', { type: cmd } );
        break;
      case 'progress':
        audio.currentTime = param;
        break;
      case 'volume':
        this.setState( { volume: param }, () => {
          audio.volume = param;
        } )
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
    const { audio } = this.refs;
    this.interval = setInterval( () => {
      if ( audio.error ) {
        Notification( {
          title: '错误',
          message: '播放错误'
        } );
        this.endPlay();
        return false;
      }
      if ( audio.ended ) {
        this.endPlay();
      } else {
        this.setState( { progress: audio.currentTime, nowtime: this.formatTime( audio.currentTime ) } )
      }
    }, 500 )
  }

  endPlay () {
    this.handleControl( 'pause' );
    this.setState( { progress: 0, nowtime: '00:00' } );
  }

  render () {
    const { status, prev, next, music, progress, volume, singtime, nowtime } = this.state;
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
                <div className="singtime">{ nowtime + ' / ' + singtime }</div>
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