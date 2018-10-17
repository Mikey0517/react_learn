import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'element-react';
import menuConfig from '../config/menu.config.js';

class Left extends Component {
  renderMenu ( menu, parentKey = "" ) {
    return menu.map( ( item, index ) => {
      let key = parentKey + index;
      let title = (
        <span 
          title={ item.title }
        >
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
            { this.renderMenu( item.children, '-' + key ) }
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item 
            key={ key }
            index={ key }
          >
            <Link 
              to={ item.url }
            >
              { title }
            </Link>
          </Menu.Item>
        )
      }
    } )
  }

  render () {
    return (
      <Menu defaultActive={ menuConfig.defaultActive }>
        { this.renderMenu( menuConfig.menu ) }
      </Menu>
    )
  }
}

export default Left;