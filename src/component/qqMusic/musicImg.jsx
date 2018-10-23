import React, { Component } from 'react';

const url = {
  img: 'https://y.gtimg.cn/music/photo_new/T002R'
};

class MusicImg extends Component {
  render () {
    const { size, id } = this.props;
    let className = 'small';
    let _size = '90x90';
    if ( size && size === 'large' ) {
      className = size;
    }
    let imgUrl = url.img + _size + 'M000' + id + '.jpg?max_age=2592000';
    return (
      <img 
        className={ className }
        src={ imgUrl }
      />
    )
  }
}

export default MusicImg;