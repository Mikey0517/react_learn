import React, { Component } from 'react';

class Backgammon extends Component {
	constructor ( props ) {
		super( props );
		this.state = {
			value: ''
		};
		this.socket = null;
	}

	componentWillMount () {
		this.initWebSocket();
	}

	initWebSocket () {
		if ( !window.WebSocket ) window.WebSocket = window.MozWebSocket;
		if ( window.WebSocket ) {
			this.socket = new WebSocket( "ws://127.0.0.1:12345/ws" );
			this.socket.onmessage = function ( event ) {
				var ta = document.getElementById( 'responseText' );
				ta.value += event.data + "\r\n";
			};
			this.socket.onopen = function ( event ) {
				var ta = document.getElementById( 'responseText' );
				ta.value = "Netty-WebSocket服务器。。。。。。连接  \r\n";
			};
			this.socket.onclose = function ( event ) {
				var ta = document.getElementById( 'responseText' );
				ta.value = "Netty-WebSocket服务器。。。。。。关闭 \r\n";
			};
		} else {
			alert( "您的浏览器不支持WebSocket协议！" );
		}
	}

	send () {
		if ( !window.WebSocket ) {
			return;
		}
		if ( this.socket.readyState === WebSocket.OPEN ) {
			this.socket.send( '111' );
		} else {
			alert( "WebSocket 连接没有建立成功！" );
		}
	}

	render () {
		return (
			<div>
				<button onClick={ this.send.bind( this ) }>发送</button>
				<textarea id="responseText" />
			</div>
		)
	}
}

export default Backgammon;