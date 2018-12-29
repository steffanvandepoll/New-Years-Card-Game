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
    let players = [];
    let activePlayer;
    let cards = this.duplicateCards(cardData.cards);
    cards = this.shuffleArray(cards);

    let cardIndex = this.state.cardIndex;
    let playerIndex = this.state.playerIndex;

    if(this.props.players && this.props.players.length > 0){
      for(let i in this.props.players){
        let player = {};
        player.name = this.props.players[i];
        player.alt = null;
        players.push(player);
      }

      players = this.shuffleArray(players);
      activePlayer = players[playerIndex];

      this.handleNameChanges(cards[cardIndex], activePlayer, players);

      this.setState({
        players: players,
        activePlayer: activePlayer,
        cards: cards,
        activeCard: cards[cardIndex]
      });
    }
  }

  duplicateCards(initialCards){
    let cards = [];
    for(let i in initialCards){
      if(initialCards[i].duplicates){
        for(let j = 0; j < initialCards[i].duplicates; j++){
          cards.push(initialCards[i]);
        }
      }
      else{
        cards.push(initialCards[i])
      }
    }
    return cards;
  }

  handleNextCard() {
    this.state.cardIndex++;
    if(this.state.cardIndex > this.state.cards.length - 1){
      this.state.cardIndex = 0;
      this.state.cards = this.shuffleArray(this.state.cards);
    }

    this.state.playerIndex++;
    if(this.state.playerIndex > this.state.players.length - 1){
      this.state.playerIndex = 0;
    }
    //check for name changes
    this.handleNameChanges(this.state.cards[this.state.cardIndex], this.state.players[this.state.playerIndex], this.state.players);

    this.setState({
      cards: this.state.cards,
      activeCard: this.state.cards[this.state.cardIndex],
      activePlayer: this.state.players[this.state.playerIndex],
      cardIndex: this.state.cardIndex,
      playerIndex: this.state.playerIndex
    });
  }

  handleNameChanges(card, activePlayer, players){
    if(card.namechange){
      //clear alt if already active on a player
      for(let i in players){
        if(players[i].alt === card.namechange){
          players[i].alt = null;
        }

        if(players[i].name === activePlayer.name){
          players[i].alt = card.namechange;
        }
      }
    }
  }

  shuffleArray(array) {
    console.log(array);
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
        <Card activePlayer={this.state.activePlayer} players={this.state.players} card={this.state.activeCard} cardIndex={this.state.cardIndex} cardCount={this.state.cards.length}/>
        <StyledButton variant="contained" onClick={this.handleNextCard.bind(this)} className="next-card">{buttonTitle}</StyledButton>
      </div>
    );
  }
}

export default Game;
