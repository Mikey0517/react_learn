import React, { Component } from 'react';
import { Table, Tag, Pagination } from 'element-react';
import { $fetch, isEqual, sendEvent, eventListener } from '../../common';
import MusicImg from './musicImg.jsx';

let url = {
  fcg_v8_toplist_cp: "/v8/fcg-bin/fcg_v8_toplist_cp.fcg"
}

class MusicList extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      pageIndex: 0,
      pageSize: 10,
      data: null,
    };
  }  

  componentWillMount () {
    this._isMounted = true;
    this.getData( this.props );
  }

  componentWillReceiveProps ( nextProps ) {
    if ( !isEqual( this.props, nextProps ) ) {
      this.getData( nextProps );
    }
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  getData ( props ) {
    const { pageSize, pageIndex } = this.state;
    const { id } = props;
    let body = {
      topid: id,
      tpl: 3,
      page: 'detail',
      type: 'top',
      g_tk: '1928093487',
      notice: 0,
      needNewCode: 1,
      song_begin: pageIndex * pageSize,
      song_num: pageSize
    };
    $fetch( url.fcg_v8_toplist_cp, 'POST', body, ( data ) => {
      if ( this._isMounted ) {
        this.setState( { data } )
      }
    } )
  }

  handleTogglePage ( index ) {
    this.setState( { pageIndex: index - 1 }, () => {
      this.getData( this.props )
    } )
  }

  handlePlay ( row ) {
    sendEvent( 'playMusic', row );
  }

  dealZero ( number ) {
    return number > 9 ? number : '0' + number;
  }

  render () {
    const { data, pageSize, pageIndex } = this.state;
    if ( !data ) return null;
    let columns = [
      {
        label: '',
        width: '150px',
        render: ( row, column, rowKey ) => {
          let index = rowKey + pageIndex * pageSize + 1;
          return (
            <div className="music-index">
              <div className={ "number-list" + ( index < 4 ? ' number-top' : '' ) }>
                { index }
              </div>
              <div className="music-log">
                <div className="music-up-img" />
                <div className="music-log-number">{ Math.round( row.in_count * 100 ) + '%' }</div>
              </div>
            </div>
          )
        }
      },
      {
        label: '歌曲',
        minWidth: '350px',
        render: ( row, column, rowKey ) => {
          const data = row.data;
          return (
            <div className="music-sing">
              <MusicImg id={ data.albummid }/>
              <div className="music-singname" title={ data.songname }>{ data.songname }</div>
              { data.albumdesc !== "" ? <div className="music-singdesc ellipsis">{ data.albumdesc }</div> : null }
              <div className="music-buttom">
                { data.isonly === 1 ? <Tag type="success">独家</Tag> : null }
                <div className="music-play" title="播放" onClick={ this.handlePlay.bind( this, data, rowKey ) } />
              </div>
            </div>
          )
        }
      },
      {
        label: '歌手',
        width: '200px',
        render: ( row ) => {
          let singer = "";
          row.data.singer.map( ( item, index ) => {
            if ( index !== 0 ) singer += " / ";
            singer += item.name;
          } )
          return <div className="music-singer ellipsis" title={ singer }>{ singer }</div>;
        }
      },
      {
        label: '时长',
        width: '100px',
        render: ( row ) => {
          let minute = Math.floor( row.data.interval / 60 );
          let second = Math.round( row.data.interval % 60 );
          return this.dealZero( minute ) + ':' + this.dealZero( second )
        }
      }
    ];
    return (
      <div
        className="music-list"
      >
        <Table 
          columns={ columns }
          data={ data.songlist }
          stripe
          highlightCurrentRow={ false }
        />
        <Pagination 
          layout="prev, pager, next" 
          total={ data.total_song_num }
          pageSize={ pageSize }
          onCurrentChange={ this.handleTogglePage.bind( this ) }
        />
      </div>
    )
  }
}

export default MusicList;