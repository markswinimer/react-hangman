import React, { Component } from 'react';

class AlphaButton extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    this.props.handleGuess(this.props.value);
  }

  render() {
    console.log(this.props)
    let ltr = this.props.value;
        // disabled={this.state.guessed.has(ltr)}
    return(
      <button value={ltr} onClick={this.handleClick} disabled={this.props.disabled}>{ltr}</button>
    )
  }
}
export default AlphaButton;
