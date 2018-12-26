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
      content = content.replace("[player1]", "<span class='player active-player'>" + this.renderPlayerName(this.player1)  + "</span>");
      content = content.replace("[player2]", "<span class='player'>" + this.renderPlayerName(this.player2)  + "</span>");
      content = content.replace("[player3]", "<span class='player'>" + this.renderPlayerName(this.player3)  + "</span>");
      content = content.replace("[player4]", "<span class='player'>" + this.renderPlayerName(this.player4)  + "</span>");

      content = content.replace("[player1.alt]", "<span class='player alt'>" + this.player1.alt + "</span>");
      content = content.replace("[player2.alt]", "<span class='player alt'>" + this.player2.alt  + "</span>");
      content = content.replace("[player3.alt]", "<span class='player alt'>" + this.player3.alt  + "</span>");
      content = content.replace("[player4.alt]", "<span class='player alt'>" + this.player4.alt  + "</span>");

      content = content.replace("[player1.name]", "<span class='player active-player'>" + this.player1.name + "</span>");
      content = content.replace("[player2.name]", "<span class='player'>" + this.player2.name  + "</span>");
      content = content.replace("[player3.name]", "<span class='player'>" + this.player3.name  + "</span>");
      content = content.replace("[player4.name]", "<span class='player'>" + this.player4.name  + "</span>");
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
      </div>
    );
  }
}

export default Card;
