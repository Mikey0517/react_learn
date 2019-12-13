import React, { Component } from 'react';
import { Carousel, Button } from 'element-react';
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

	componentWillMount () {
		console.log( 11 )
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
		return (
			<div className='gaming'>
				<MapPanel
					mapConfig={ mapConfig }
				/>
				<TankPanel
					mapConfig={ mapConfig }
					isDouble={ isDouble }
					onTankMove={ this.handleCheckMove.bind( this ) }
				/>
			</div>
		)
	}
}

class MapPanel extends Component {
	render () {
		const { mapConfig } = this.props;
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
			</div>
		)
	}
}

class TankPanel extends Component {
	constructor ( props ) {
		super( props );
		this.state = {
			p1: {
				left: 240,
				top: 720,
				deg: 0,
				time: 0,
				direction: 'up'
			},
			p2: {
				left: 480,
				top: 720,
				deg: 0,
				time: 0,
				direction: 'up'
			}
		};
		// 键盘监听事件响应方法
		this.handleKeydown = this.handleKeydown.bind( this );
	}

	componentWillMount () {
		const { mapConfig } = this.props;
		const { p1, p2 } = mapConfig;
		let state = {};
		if ( p1 ) state.p1 = p1;
		if ( p2 ) state.p2 = p2;
		this.setState( state );
		document.addEventListener( 'keydown', this.throttle( this.handleKeydown, 300 ) );
	}

	componentWillUnmount () {
		document.removeEventListener( 'keydown', this.throttle( this.handleKeydown, 300 ) );
	}

	handleKeydown ( e ) {
		this.controllerTank( e.keyCode );
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

	controllerTank ( code ) {
		const { p1 } = this.state;
		const { onTankMove } = this.props;
		let _p1 = Object.assign( {}, p1 );
		let deg = _p1.deg % 360;
		deg = Math.abs( deg === -90 ? 270 : deg === -270 ? 90 : deg );
		let numArr = [];
		switch ( code ) {
			// up
			case 87:
				numArr = [ 0, 180, 90, 'top', -30, 'up' ];
				break;
			// right
			case 68:
				numArr = [ 90, 270, 180, 'left', 30, 'right' ];
				break;
			// down
			case 83:
				numArr = [ 180, 0, 270, 'top', 30, 'down' ];
				break;
			// left
			case 65:
				numArr = [ 270, 90, 0, 'left', -30, 'left' ];
				break;
		}
		if ( [ 87, 68, 83, 65 ].includes( code ) ) {
			_p1.direction = numArr[ 5 ];
			if ( deg === numArr[ 0 ] ) {
				_p1.time = 300;
				_p1[ numArr[ 3 ] ] += numArr[ 4 ];
				onTankMove( _p1, check => {
					if ( check ) this.setState( { p1: _p1 } );
				} );
			} else {
				_p1.time = 300;
				if ( deg === numArr[ 1 ] ) {
					if ( _p1.deg > 0 ) {
						_p1.deg -= 180;
					} else {
						_p1.deg += 180;
					}
				} else {
					if ( deg === numArr[ 2 ] ) {
						_p1.deg -= 90;
					} else {
						_p1.deg += 90;
					}
				}
				this.setState( { p1: _p1 } );
			}
		}
	}

	render () {
		const { isDouble } = this.props;
		const { p1, p2 } = this.state;
		let tankOneStyle = {
			left: `${ p1.left }px`,
			top: `${ p1.top }px`,
			transform: `rotate(${ p1.deg ? p1.deg : 0 }deg)`,
			transitionDuration: `${ p1.time }ms`
		};
		let tankTwoStyle = {
			left: `${ p2.left }px`,
			top: `${ p2.top }px`,
			transform: `rotate(${ p2.deg ? p2.deg : 0 }deg)`,
			transitionDuration: `${ p1.time }ms`
		};
		return (
			<div className='panel'>
				<div
					className='tank-one'
					style={ tankOneStyle }
				/>
				{
					isDouble
						? <div
							className='tank-two'
							style={ tankTwoStyle }
						/>
						: null
				}
			</div>
		)
	}
}

export default TankBattle;