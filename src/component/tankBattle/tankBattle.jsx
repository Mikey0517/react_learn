import React, { Component } from 'react';
import { Carousel, Button } from 'element-react';
import { uuid } from '../../common';
import '../../assets/css/tankBattle.css';
import maps from '../../common/tankBattleMap';

/*
 * 坦克大战
 * */
class TankBattle extends Component {
	constructor ( props ) {
		super( props );
		this.state = {
			mapIndex: 0,
			isDouble: false
		};
		this.carousel = null;
	}

	handleStartGame () {
		const { setActiveItem } = this.carousel;
		setActiveItem && setActiveItem.call( this.carousel, 'mapList' );
	}

	handleSelectChange ( index ) {
		this.setState( { mapIndex: index }, () => {
			const { setActiveItem } = this.carousel;
			setActiveItem && setActiveItem.call( this.carousel, 'inTheGame' );
		} )
	}

	render () {
		const { mapIndex, isDouble } = this.state;
		return (
			<div className='tank-battle'>
				<div className='tank-battle-warp'>
					<Carousel
						ref={ carousel => this.carousel = carousel }
						autoplay={ false }
						height="780px"
						arrow="never"
						indicatorPosition="none"
						initialIndex={ 2 }
					>
						<Carousel.Item name='startInterface'>
							<StartInterface
								onStartGame={ this.handleStartGame.bind( this ) }
							/>
						</Carousel.Item>
						<Carousel.Item name='mapList'>
							<MapList
								onChange={ this.handleSelectChange.bind( this ) }
							/>
						</Carousel.Item>
						<Carousel.Item name='inTheGame'>
							{
								mapIndex !== null
									? <Gaming
										mapConfig={ maps[ mapIndex ].value }
										isDouble={ isDouble }
									/>
									: null
							}
						</Carousel.Item>
					</Carousel>
				</div>
			</div>
		)
	}
}

class StartInterface extends Component {
	handleClick () {
		const { onStartGame } = this.props;
		onStartGame && onStartGame();
	}

	render () {
		return (
			<div className='start-interface'>
				<Button type="info" onClick={ this.handleClick.bind( this ) }>开始游戏</Button>
			</div>
		)
	}
}

class MapList extends Component {
	handleClick ( index ) {
		const { onChange } = this.props;
		onChange && onChange( index );
	}

	render () {
		return (
			<div className='mapList'>
				<div className='title'>地图选择</div>
				<div className='list'>
					{
						maps.map( ( item, index ) => (
							<div
								key={ index }
								onClick={ this.handleClick.bind( this, index ) }
							>
								{ item.name }
							</div>
						) )
					}
				</div>
			</div>
		)
	}
}

/*
 * 游戏主体程序
 * */
class Gaming extends Component {
	constructor ( props ) {
		super( props );
	}

	render () {
		const { mapConfig, isDouble } = this.props;
		return (
			<div className='gaming'>
				<Panel
					mapConfig={ mapConfig }
					isDouble={ true }
				/>
			</div>
		)
	}
}

class Panel extends Component {
	constructor ( props ) {
		super( props );
		this.handleCheckMove = this.handleCheckMove.bind( this );
	}

	handleCheckMove ( position, after ) {
		const { top, left, direction } = position;
		const { map } = this.props.mapConfig;
		let dots = [];
		let check = true;
		let blockObj = {
			up: [ 0, 1 ],
			left: [ 0, 2 ],
			right: [ 1, 3 ],
			down: [ 2, 3 ]
		};
		if ( top % 60 === 0 ) {
			if ( left % 60 === 0 ) {
				dots.push( {
					x: left / 60,
					y: top / 60,
					range: blockObj[ direction ]
				} )
			} else {
				if ( direction === 'up' || direction === 'down' ) {
					let x = Math.floor( left / 60 );
					for ( let i = 0; i < 2; i++ ) {
						dots.push( {
							x: x + i,
							y: top / 60,
							range: [ blockObj[ direction ][ i === 0 ? 1 : 0 ] ]
						} )
					}
				} else {
					dots.push( {
						x: Math[ direction === 'left' ? 'floor' : 'ceil' ]( left / 60 ),
						y: top / 60,
						range: blockObj[ direction === 'left' ? 'right' : 'left' ]
					} )
				}
			}
		} else {
			if ( left % 60 === 0 ) {
				if ( direction === 'left' || direction === 'right' ) {
					let y = Math.floor( top / 60 );
					for ( let i = 0; i < 2; i++ ) {
						dots.push( {
							x: left / 60,
							y: y + i,
							range: [ blockObj[ direction ][ i === 0 ? 1 : 0 ] ]
						} )
					}
				} else {
					dots.push( {
						x: left / 60,
						y: Math[ direction === 'up' ? 'floor' : 'ceil' ]( top / 60 ),
						range: blockObj[ direction === 'up' ? 'down' : 'up' ]
					} )
				}
			} else {
				if ( direction === 'up' || direction === 'down' ) {
					let x = Math.floor( left / 60 );
					for ( let i = 0; i < 2; i++ ) {
						dots.push( {
							x: x + i,
							y: Math[ direction === 'up' ? 'floor' : 'ceil' ]( top / 60 ),
							range: [ blockObj[ direction === 'up' ? 'down' : 'up' ][ i === 0 ? 1 : 0 ] ]
						} )
					}
				} else {
					let y = Math.floor( top / 60 );
					for ( let i = 0; i < 2; i++ ) {
						dots.push( {
							x: Math[ direction === 'left' ? 'floor' : 'ceil' ]( left / 60 ),
							y: y + i,
							range: [ blockObj[ direction === 'left' ? 'right' : 'left' ][ i === 0 ? 1 : 0 ] ]
						} )
					}
				}
			}
		}

		for ( let i = 0; i < dots.length; i++ ) {
			let dot = dots[ i ];
			if ( map.has( dot.y ) ) {
				if ( map.get( dot.y ).has( dot.x ) ) {
					let range = map.get( dot.y ).get( dot.x ).range;
					if ( range ) {
						for ( let j = 0; j < dot.range.length; j++ ) {
							if ( range.includes( dot.range[ j ] ) ) {
								check = false;
								break;
							}
						}
					} else {
						check = false;
						break;
					}
				}
			}
		}
		after( check );
	}

	render () {
		const { mapConfig, isDouble } = this.props;
		const { size, map, base } = mapConfig;
		let defaultBase = {
			x: Math.floor( size.x / 2 ),
			y: size.y - 1
		};
		if ( base ) defaultBase = base;
		return (
			<div className='panel'>
				{
					( new Array( size.y ) ).fill( 0 ).map( ( item, j ) => {
						let rData = map.has( j ) ? map.get( j ) : null;
						let isBase = j === defaultBase.y;
						return (
							<div className='row' key={ j }>
								{
									( new Array( size.x ) ).fill( 0 ).map( ( item, i ) => {
										let className = `col`;
										let range = [];
										let cData = rData && rData.has( i ) ? rData.get( i ) : null;
										if ( isBase && defaultBase.x === i ) {
											className = `${ className } base`;
										} else {
											if ( cData ) {
												if ( cData.range ) {
													range = cData.range;
												} else {
													className = `${ className } ${ cData.className }`;
												}
											}
										}
										return (
											<div className={ className } key={ i }>
												{
													( new Array( 4 ) ).fill( 0 ).map( ( item, k ) => {
														let className = `block ${ range.includes( k ) ? cData.className : '' }`;
														return (
															<div
																key={ k }
																className={ className }
															/>
														)
													} )
												}
											</div>
										)
									} )
								}
							</div>
						)
					} )
				}
				<Tank
					className='tank-one'
					auto={ false }
					keyMap={ [ 87, 68, 83, 65 ] }
					onTankMove={ this.handleCheckMove }
				/>
				{
					isDouble
						? <Tank
								className='tank-two'
								position={ [ 480, 720 ] }
								auto={ false }
								keyMap={ [ 38, 39, 40, 37 ] }
								onTankMove={ this.handleCheckMove }
							/>
						: null
				}
			</div>
		)
	}
}

class Tank extends Component {
	constructor ( props ) {
		super( props );
		this.state = {
			tank: {
				left: 240,
				top: 720,
				deg: 0,
				time: 0,
				direction: 'up'
			}
		};
		this.id = uuid();
		this.keyMap = [ 87, 68, 83, 65 ];
		this.dictionary = {
			deg: {
				up: 0,
				left: 270,
				right: 90,
				down: 180
			}
		};
		this.handleKeydown = this.handleKeydown.bind( this );
	}

	componentWillMount () {
		this.initTank();
	}

	componentDidMount () {
		document.addEventListener( 'keydown', this.throttle( this.handleKeydown, 300 ) );
	}

	componentWillUnmount () {
		document.removeEventListener( 'keydown', this.throttle( this.handleKeydown, 300 ) );
	}

	initTank () {
		const { position, direction, keyMap } = this.props;
		let tank = null;
		if ( position !== void 0 ) {
			tank = {
				left: position[ 0 ],
				top: position[ 1 ]
			};
		}
		if ( direction !== void 0 ) {
			if ( !tank ) tank = {};
			tank.direction = direction;
			tank.deg = this.dictionary.deg[ direction ];
		}
		if ( keyMap !== void 0 ) this.keyMap = keyMap;
		if ( tank ) this.setState( { tank } );
	}

	throttle ( callback, gapTime ) {
		let lastTime = null;
		return function () {
			let nowTime = +new Date();
			if ( nowTime - lastTime > gapTime || !lastTime ) {
				callback( ...arguments );
				lastTime = nowTime
			}
		}
	}

	handleKeydown ( e ) {
		console.log( e.keyCode );
		this.controllerTank( e.keyCode );
	}

	controllerTank ( code ) {
		const { tank } = this.state;
		const { onTankMove } = this.props;
		let _tank = Object.assign( {}, tank );
		let deg = _tank.deg % 360;
		deg = Math.abs( deg === -90 ? 270 : deg === -270 ? 90 : deg );
		let numArr = [];
		switch ( code ) {
			// up
			case this.keyMap[ 0 ]:
				numArr = [ 0, 180, 90, 'top', -30, 'up' ];
				break;
			// right
			case this.keyMap[ 1 ]:
				numArr = [ 90, 270, 180, 'left', 30, 'right' ];
				break;
			// down
			case this.keyMap[ 2 ]:
				numArr = [ 180, 0, 270, 'top', 30, 'down' ];
				break;
			// left
			case this.keyMap[ 3 ]:
				numArr = [ 270, 90, 0, 'left', -30, 'left' ];
				break;
		}
		if ( this.keyMap.includes( code ) ) {
			_tank.direction = numArr[ 5 ];
			if ( deg === numArr[ 0 ] ) {
				_tank.time = 300;
				_tank[ numArr[ 3 ] ] += numArr[ 4 ];
				onTankMove( _tank, check => {
					if ( check ) this.setState( { tank: _tank } );
				} );
			} else {
				_tank.time = 300;
				if ( deg === numArr[ 1 ] ) {
					if ( _tank.deg > 0 ) {
						_tank.deg -= 180;
					} else {
						_tank.deg += 180;
					}
				} else {
					if ( deg === numArr[ 2 ] ) {
						_tank.deg -= 90;
					} else {
						_tank.deg += 90;
					}
				}
				this.setState( { tank: _tank } );
			}
		}
	}

	render () {
		const { tank } = this.state;
		const { className } = this.props;
		let tankStyle = {
			left: `${ tank.left }px`,
			top: `${ tank.top }px`,
			transform: `rotate(${ tank.deg ? tank.deg : 0 }deg)`,
			transitionDuration: `${ tank.time }ms`
		};
		return (
			<div
				id={ this.id }
				className={ `tank ${ className }` }
				style={ tankStyle }
			/>
		)
	}
}

export default TankBattle;