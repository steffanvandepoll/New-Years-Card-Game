import React, { Component } from 'react';
import Players from './Players';
import Card from './Card';

import cardData from '../data/cards.json';


class Game extends Component {
  constructor(){
    super();
    this.state = {
      players: [],
      cards: [],
      activePlayer: "",
      activeCard: ""
    }
  }
  componentDidMount() {
    let players;
    let activePlayer;
    let cards = this.shuffleArray(cardData.cards);
    let activeCard = cards[0];

    if(this.props.players && this.props.players.length > 0){
      players = this.shuffleArray(this.props.players);
      activePlayer = players[0];

      this.setState({
        players: players,
        activePlayer: activePlayer,
        cards: cards,
        activeCard: activeCard
      });
    }
  }

  handleNextCard() {

  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
  render() {
    return (
      <div className="game">
        <Players activePlayer={this.state.activePlayer} players={this.state.players} />
        <Card activePlayer={this.state.activePlayer} players={this.state.players} card={this.state.activeCard} />
      </div>
    );
  }
}

export default Game;
