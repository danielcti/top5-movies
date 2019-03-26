import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo/Logo'
import Ranking from './components/ranking/Ranking'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Logo />
      <Ranking />
      </div>
    );
  }
}

export default App;
