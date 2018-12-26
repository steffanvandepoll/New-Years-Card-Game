import React, { Component } from 'react';
import Players from './Players';
import Card from './Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import cardData from '../data/cards.json';

const StyledButton = withStyles({
  root: {
    background: '#285805',
    borderRadius: 50,
    border: 0,
    color: 'white',
    padding: '20px 40px',
    fontSize:'30px',
    margin: '50px 0 50px 0',
    '&:hover': {
      background: '#41870f'
    }
  }
})(Button);


class Game extends Component {
  constructor(){
    super();
    this.state = {
      players: [],
      cards: [],
      activePlayer: "",
      activeCard: "",
      cardIndex: 0,
      playerIndex: 0
    }
  }
  componentDidMount() {
    let players;
    let activePlayer;
    let cards = this.shuffleArray(cardData.cards);
    let cardIndex = this.state.cardIndex;
    let playerIndex = this.state.playerIndex;

    if(this.props.players && this.props.players.length > 0){
      players = this.shuffleArray(this.props.players);
      activePlayer = players[playerIndex];

      this.setState({
        players: players,
        activePlayer: activePlayer,
        cards: cards,
        activeCard: cards[cardIndex]
      });
    }
  }

  handleNextCard() {
    this.state.cardIndex++;
    if(this.state.cardIndex > this.state.cards.length - 1){
      this.state.cardIndex = 0;
    }

    this.state.playerIndex++;
    if(this.state.playerIndex > this.state.players.length - 1){
      this.state.playerIndex = 0;
    }
    //reshuffle the deck
    this.state.cards = this.shuffleArray(this.state.cards);

    this.setState({
      cards: this.state.cards,
      activeCard: this.state.cards[this.state.cardIndex],
      activePlayer: this.state.players[this.state.playerIndex],
      cardIndex: this.state.cardIndex,
      playerIndex: this.state.playerIndex
    });
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
    let buttonTitle = this.state.cardIndex === this.state.cards.length - 1 ? "shuffle deck" : "next card";
    return (
      <div className="game">
        <Players activePlayer={this.state.activePlayer} players={this.state.players} />
        <Card activePlayer={this.state.activePlayer} players={this.state.players} card={this.state.activeCard} />
        <StyledButton variant="contained" onClick={this.handleNextCard.bind(this)} className="next-card">{buttonTitle}</StyledButton>
      </div>
    );
  }
}

export default Game;
