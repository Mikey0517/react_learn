import React, { Component } from "react";
import '../../assets/css/progress.css';

class Progress extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      text: null,
    }
  }
  componentDidMount () {
    window.onload = () => {
      this.getProgress()
    }
  }

  componentDidUpdate () {
    this.getProgress()
  }

  getProgress () {
    const { numerator, denominator } = this.props;
    let progressInfo = this.refs.progress.getBoundingClientRect();
    let progress = denominator === 0 ? 0 : numerator / denominator * progressInfo.width;
    this.refs.progressIner.style.width = progress + 'px';
  }

  handleClick () {
    const { denominator, onClick } = this.props;
    if ( denominator !== 0 && onClick ) {
      onClick( this.progress );
    }
  }

  handleMouseMove ( event ) {
    const { denominator } = this.props;
    if ( denominator !== 0 ) {
      let progressInfo = this.refs.progress.getBoundingClientRect();
      this.progress = ( event.clientX - progressInfo.x ) / progressInfo.width * denominator;
      this.setState( { text: this.progress } )
    }
  }

  render () {
    const { text } = this.state;
    const { showFormat } = this.props;
    return (
      <div ref="progress" title={ showFormat ? showFormat( text ) : null } className="progress" onClick={ this.handleClick.bind( this ) } onMouseMove={ this.handleMouseMove.bind( this ) }>
        <div ref="progressIner" className="progress-iner"/>
      </div>
    )
  }
}

export default Progress;