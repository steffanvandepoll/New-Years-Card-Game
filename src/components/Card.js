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
      content = content.replace("[player1]", "<span class='player active-player'>" + this.player1  + "</span>");
      content = content.replace("[player2]", "<span class='player'>" + this.player2  + "</span>");
      content = content.replace("[player3]", "<span class='player'>" + this.player3  + "</span>");
      content = content.replace("[player4]", "<span class='player'>" + this.player4  + "</span>");
    }
    return content;
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


    return (
      <div className="card">
        <h2>"{this.props.card.title}"</h2>
        <p dangerouslySetInnerHTML={ { __html: content } }></p>
        <ul>{rules}</ul>
      </div>
    );
  }
}

export default Card;
