import React, { Component } from 'react';

class MineItem extends Component {
  constructor ( props ) {
    super( props );
  }

  shouldComponentUpdate ( nextProps ) {
    return this.props.status !== nextProps.status;
  }

  render () {
    const { onClick, onContextMenu, status } = this.props;
    let className = 'col';
    let html = '';
    if ( typeof status !== 'undefined' ) {
      if ( status > -2 ) {
        className += ' open';
        if ( status === -1 ) {
          className += ' mine';
        } else {
          html = status === 0 ? '' : status;
        }
      } else {
        if ( status === -2 ) {
          html = '🚩';
        } else {
          html = '?';
        }
      }
    }
    return (
      <div
        className={ className }
        onClick={ onClick }
        onContextMenu={ onContextMenu }
        dangerouslySetInnerHTML={ { __html: html } }
      />
    )
  }
}

class Panel extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      type: 'primary',
      cache: new Map()
    };
    this.type = {
      primary: {
        xLength: 9,
        yLength: 9,
        mine: 10
      }
    };
    this.mine = null;
    this.isClick = true;
    this.openGrid = 0;
  }

  componentWillMount () {
    this.initMinePosition()
  }

  initMinePosition () {
    const { type } = this.state;
    const { mine } = this.type[ type ];
    this.mine = new Set();
    while ( this.mine.size !== mine ) {
      let value = this.random();
      if ( !this.mine.has( value ) ) {
        this.mine.add( value );
      }
    }
  }

  random () {
    const { type } = this.state;
    const { xLength, yLength } = this.type[ type ];
    let i = Math.floor( Math.random() * xLength );
    let j = Math.floor( Math.random() * yLength );
    return i * 10 + j;
  }

  handleClick ( x, y, index ) {
    const { cache, type } = this.state;
    if ( cache.has( index ) || !this.isClick ) return false;
    if ( this.searchGrid( index ) ) {
      this.isClick = false;
      cache.set( index, -1 );
      this.setState( { cache } );
      alert( '输了' )
    } else {
      this.openGrid++;
      let roundMine = 0;
      let roundGridList = this.findRoundGrid( x, y );
      let keyList = Object.keys( roundGridList );
      keyList.map( ( key ) => {
        let round = roundGridList[ key ];
        if ( this.searchGrid( round[ 0 ] * 10 + round[ 1 ] ) ) roundMine++;
      } );
      cache.set( index, roundMine );
      this.setState( { cache }, () => {
        const { xLength, yLength, mine } = this.type[ type ];
        if ( this.openGrid === xLength * yLength - mine ) {
          alert( '赢了' )
        } else {
          if ( roundMine === 0 ) {
            keyList.map( ( key ) => {
              let round = roundGridList[ key ];
              this.handleClick( round[ 0 ], round[ 1 ], round[ 0 ] * 10 + round[ 1 ] );
            } );
          }
        }
      } );
    }
  }

  /**
   * 查询格子是否有雷
   * */
  searchGrid ( index ) {
    return this.mine.has( index );
  }

  findRoundGrid ( x, y ) {
    const { type } = this.state;
    const { xLength, yLength } = this.type[ type ];
    let roundGridList = {
      'top': [ x, y - 1 ],
      'top-right': [ x + 1, y - 1 ],
      'right': [ x + 1, y ],
      'bottom-right': [ x + 1, y + 1 ],
      'bottom': [ x, y + 1 ],
      'bottom-left': [ x - 1, y + 1 ],
      'left': [ x - 1, y ],
      'top-left': [ x - 1, y - 1 ]
    };
    let keyList = Object.keys( roundGridList );
    let dealData = ( position ) => {
      for ( let i = 0; i < keyList.length; i++ ) {
        let key = keyList[ i ];
        if ( key.includes( position ) ) {
          delete roundGridList[ key ];
          keyList.splice( i, 1 );
          i--;
        }
      }
    };
    if ( x === 0 ) dealData( 'left' );
    if ( y === 0 ) dealData( 'top' );
    if ( x === xLength - 1 ) dealData( 'right' );
    if ( y === yLength - 1 ) dealData( 'bottom' );
    return roundGridList;
  }

  handleContextMenu ( index, e ) {
    e.preventDefault();
    if ( !this.isClick ) return false;
    const { cache } = this.state;
    if ( !cache.has( index ) ) {
      cache.set( index, -2 );
    } else {
      let code = cache.get( index );
      if ( code === -2 ) {
        cache.set( index, -3 );
      } else if ( code === -3 ) {
        cache.delete( index );
      } else {
        return false;
      }
    }
    this.setState( { cache } );
  }

  render () {
    const { type, cache } = this.state;
    const { xLength, yLength } = this.type[ type ];
    return (
      <div className='mine-sweeping-panel'>
        {
          ( new Array( yLength ) ).fill( 0 ).map( ( item, j ) => (
            <div className='row' key={ j }>
              {
                ( new Array( xLength ) ).fill( 0 ).map( ( item, i ) => {
                  let index = i * 10 + j;
                  return (
                    <MineItem
                      key={ index }
                      onClick={ this.handleClick.bind( this, i, j, index ) }
                      onContextMenu={ this.handleContextMenu.bind( this, index ) }
                      status={ cache.get( index ) }
                    />
                  )
                } )
              }
            </div>
          ) )
        }
      </div>
    )
  }
}

export default Panel;