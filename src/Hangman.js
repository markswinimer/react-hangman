import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./images/0.jpg"
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import { randomWord } from './words';
import AlphaButton from './AlphaButton';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    letters: "abcdefghijklmnopqrstuvwxyz"
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }


handleRestart() {
  this.setState( { nWrong: 0, guessed: new Set(), answer: randomWord() } )
}
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    this.setState(st => ({
      guessed: st.guessed.add(evt),
      nWrong: st.nWrong + (st.answer.includes(evt) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return this.props.letters.split("").map(ltr => (
      <AlphaButton
        key={ltr}
        value={ltr}
        handleGuess={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      />
    ));
  }

  /** render: render game */
  render() {
    let gameOver = this.state.nWrong >= this.props.maxWrong;
    let isWinner = this.guessedWord().join("") === this.state.answer
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win!"
    if (gameOver) gameState = "You Lose, answer revealed"

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img alt={`${this.state.nWrong} Wrong Guesses`}src={this.props.images[this.state.nWrong]} />
        <p>Number wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{!gameOver
          ? this.guessedWord()
          : this.state.answer}
        </p>
        <p className='Hangman-btns'>{gameState}</p>
        <p><button className="HangmanRestart" onClick={this.handleRestart}>Restart Game</button></p>
      </div>
    );
  }
}

export default Hangman;
