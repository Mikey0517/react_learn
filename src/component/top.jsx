import React, { Component } from 'react';
import { Dropdown } from 'element-react';
import { $fetch } from "../common";
import defaultAvatar from '../assets/image/login/defaultAvatar.jpg';

class Top extends Component {
	constructor ( props ) {
		super( props );
		this.state = {
		  user: null
    }
	}

	componentWillMount () {
	  this.initData();
  }

  initData () {
	  $fetch( `/play/user?userId=${ 1 }`, 'GET', null, data => {
	  	console.log( data )
	  } )
  }

  handleCommand ( command ) {
	  switch ( command ) {
      case 'userInfo':
        break;
      case 'loginOut':
        localStorage.removeItem( 'token' );
        this.props.history.push( '/login' );
        break
    }
  }

	render () {
	  const { user } = this.state;
		return (
			<div className='x-header'>
				<div className='header-login-wrap'>
					<div className='user-avatar'>
						<Dropdown
							menuAlign='start'
              onCommand={ this.handleCommand.bind( this ) }
							menu={ (
								<Dropdown.Menu>
									<Dropdown.Item command="userInfo">个人信息</Dropdown.Item>
									<Dropdown.Item command="loginOut" divided>退出登录</Dropdown.Item>
								</Dropdown.Menu>
							) }
						>
							<img src={ defaultAvatar }/>
						</Dropdown>
					</div>
          <div className='user-info'>
            欢迎您，{ user ? user.username : '' }
          </div>
				</div>
			</div>
		)
	}
}

export default Top;