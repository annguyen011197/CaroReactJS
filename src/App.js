import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './cpn/Game';
import Board from './cpn/Board';

class App extends Component {
 
  render() {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

export default App;
