import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimeSliceList from './Component/TimeSliceList'
  function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
      );
  }

  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
            value={this.props.squareValues[i]}
            onClick={() => this.props.onClick(i)}
            currentPlayer={this.props.currentPlayer}
        />
      );
    }

    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
         squareValues : Array(9).fill(null),
         currentPlayer: 'X',
         timeSlices: []
      }
    }

    handleClick(i) {
      if (this.state.squareValues[i] || calculateWinner(this.state.squareValues)) return;
      const squareValues = this.state.squareValues.slice();
      squareValues[i] = this.state.currentPlayer;
      this.setState({
          squareValues: squareValues, 
          currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
          timeSlices: [this.state.squareValues, ...this.state.timeSlices],
      });
    }

    setPointInTime(pointInTime) {
      console.info("Point in time: ", pointInTime);
      this.setState({
        squareValues: pointInTime
      });
    }
  
    render() {
      const winner = calculateWinner(this.state.squareValues);
      let status;
      if (winner) {
          status = 'Winner: ' + winner;
      }
      else {
          status = `Next player: ${this.state.currentPlayer}`;
      }

      return (
          <div className="game">
            <div className="game-board">
              <Board squareValues={this.state.squareValues} onClick={i => this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div className="status">{status}</div>
              <TimeSliceList timeSlices={this.state.timeSlices} setPointInTime={this.setPointInTime.bind(this)} />
            </div>
          </div>
        );
      }
    }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  