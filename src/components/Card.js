import React, { Component } from 'react';
import { ChevronRight } from 'react-feather';
import '../css/card.scss';


class Card extends Component {
  constructor(){
    super();
    this.state = {
      content: ""
    }

    this.player1 = null;
    this.player2 = null;
    this.player3 = null;
    this.player4 = null;
  }
  setUpPlayers() {
    let players = this.props.players;
    this.player1 = this.props.activePlayer;
    // adding players
    players = this.removeFromList(players, this.player1);

    this.player2 = this.getRandomPlayerFromList(players);
    players = this.removeFromList(players, this.player2);

    this.player3 = this.getRandomPlayerFromList(players);
    players = this.removeFromList(players, this.player3);

    this.player4 = this.getRandomPlayerFromList(players);
    players = this.removeFromList(players, this.player4);
  }

  getContentWithPlayerNames(content){
    if(typeof content !== 'undefined'){
      //replacing content
      content = content.replace(new RegExp("\\[player1\\]", "g"), "<span class='player active-player'>" + this.renderPlayerName(this.player1)  + "</span>");
      content = content.replace(new RegExp("\\[player2\\]", "g"), "<span class='player'>" + this.renderPlayerName(this.player2)  + "</span>");
      content = content.replace(new RegExp("\\[player3\\]", "g"), "<span class='player'>" + this.renderPlayerName(this.player3)  + "</span>");
      content = content.replace(new RegExp("\\[player4\\]", "g"), "<span class='player'>" + this.renderPlayerName(this.player4)  + "</span>");

      content = content.replace(new RegExp("\\[player1.alt\\]", "g"), "<span class='player alt'>" + this.player1.alt + "</span>");
      content = content.replace(new RegExp("\\[player2.alt\\]", "g"), "<span class='player alt'>" + this.player2.alt  + "</span>");
      content = content.replace(new RegExp("\\[player3.alt\\]", "g"), "<span class='player alt'>" + this.player3.alt  + "</span>");
      content = content.replace(new RegExp("\\[player4.alt\\]", "g"), "<span class='player alt'>" + this.player4.alt  + "</span>");

      content = content.replace(new RegExp("\\[player1.name\\]", "g"), "<span class='player active-player'>" + this.player1.name + "</span>");
      content = content.replace(new RegExp("\\[player2.name\\]", "g"), "<span class='player'>" + this.player2.name  + "</span>");
      content = content.replace(new RegExp("\\[player3.name\\]", "g"), "<span class='player'>" + this.player3.name  + "</span>");
      content = content.replace(new RegExp("\\[player4.name\\]", "g"), "<span class='player'>" + this.player4.name  + "</span>");
    }
    return content;
  }

  renderPlayerName(player){
    return player.alt != null ? player.alt + " <span class='real-name'>" + player.name + "</span>" : player.name;
  }

  getRandomPlayerFromList(array){
    if(!array.length > 0){
      return null;
    }
    return array[Math.floor(Math.random() * array.length)];
  }

  removeFromList(array, object){
    return array.filter(function(el) { return el !== object; });
  }
  render() {
    this.setUpPlayers();
    let content = this.getContentWithPlayerNames(this.props.card.description);
    let rules;
    if(typeof this.props.card.rules !== 'undefined'){
      rules = this.props.card.rules.map(rule => {
       return (
         <li>
           <ChevronRight />
           <span dangerouslySetInnerHTML={ { __html: this.getContentWithPlayerNames(rule) } }></span>
         </li>
       );
     });
    }

    let classes = this.props.card.theme ? this.props.card.theme + " card" : "card";

    return (
      <div className={classes}>
        <h2>"{this.props.card.title}"</h2>
        <p dangerouslySetInnerHTML={ { __html: content } }></p>
        <ul>{rules}</ul>
        <span class="card-count">{this.props.cardIndex + 1}/{this.props.cardCount}</span>
      </div>
    );
  }
}

export default Card;
