import React, { Component } from 'react';
import { ArrowRight } from 'react-feather';
import '../css/players.scss';

class Players extends Component {

  constructor(){
    super();
    this.state = {
      players: []
    }
  }

  render() {
    let players;
    if(this.props.players){
      players = this.props.players.map(player => {
        let activePlayer;
        if(player === this.props.activePlayer){
          activePlayer = <ArrowRight />
        }
        return (
          <li>
            {activePlayer}
            {player}
          </li>
        );
      });
    }
    return (
      <div className="player-list">
        <h2>Players</h2>
        <ul className="list-group">{players}</ul>
      </div>
    );
  }
}

export default Players;
