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
    if ( status === -1 ) {
      className += ' mine';
    } else {
      if ( status === -2 ) {
        html = '🚩';
      } else if ( status > 0 ) {
        html = status;
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
        x: 9,
        y: 9,
        mine: 10
      }
    };
    this.mine = null;
    this.isClick = true;
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
    const { x, y } = this.type[ type ];
    let i = Math.floor( Math.random() * x );
    let j = Math.floor( Math.random() * y );
    return i * 10 + j;
  }

  handleClick ( x, y, index ) {
    const { cache } = this.state;
    if ( cache.has( index ) || !this.isClick ) return false;
    if ( this.mine.has( index ) ) {
      this.isClick = true;
      cache.set( index, -1 );
      this.setState( { cache } );
    } else {

    }
  }

  handleContextMenu ( index, e ) {
    const { cache } = this.state;
    if ( !cache.has( index ) ) cache.set( index, -2 );
    this.setState( { cache } );
    e.preventDefault();
  }

  render () {
    const { type, cache } = this.state;
    const { x, y } = this.type[ type ];
    return (
      <div className='mine-sweeping-panel'>
        {
          ( new Array( y ) ).fill( 0 ).map( ( item, j ) => (
            <div className='row' key={ j }>
              {
                ( new Array( x ) ).fill( 0 ).map( ( item, i ) => {
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