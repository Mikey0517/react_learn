import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'element-react';
import menuConfig from '../config/menu.config.js';

class Left extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      index: '0',
    }
  }

  componentWillMount () {
    const { location } = this.props;
    this.setState( { index: this.getActiveIndex( location.pathname, menuConfig.menu, '' ) } );
  }

  getActiveIndex ( url, menu, key ) {
    for ( let i = 0; i < menu.length; i++ ) {
      if ( menu[ i ].url === url ) {
        return key + i;
      } else {
        if ( menu[ i ].children ) {
          this.getActiveIndex( url, menu[ i ].children, i + '-' )
        }
      }
    }
  }

  renderMenu ( menu, parentKey = "" ) {
    return menu.map( ( item, index ) => {
      let key = parentKey + index;
      let title = (
        <span title={ item.title }>
          {
            item.icon 
            ? <i className={ item.icon } />
            : null
          }
          { item.title }
        </span>
      );
      if ( item.children ) {
        return (
          <Menu.SubMenu 
            key={ key }
            index={ key }
            title={ title }
          >
            { this.renderMenu( item.children, key + '-' ) }
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item 
            key={ key }
            index={ key }
          >
            <Link to={ item.url }>
              { title }
            </Link>
          </Menu.Item>
        )
      }
    } )
  }

  render () {
    const { index } = this.state;
    return (
      <Menu defaultActive={ index }>
        { this.renderMenu( menuConfig.menu ) }
      </Menu>
    )
  }
}

export default Left;