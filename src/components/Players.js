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
        let playerName = player.alt != null ? player.alt + " <span class='real-name'>" + player.name + "</span>" : player.name;
        return (
          <li>
            {activePlayer}
            <span dangerouslySetInnerHTML={ { __html: playerName } }></span>
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
