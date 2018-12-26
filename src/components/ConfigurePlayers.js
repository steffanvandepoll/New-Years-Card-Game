import React, { Component } from 'react';
import { PlusCircle } from 'react-feather';
import '../css/configure-players.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

class ConfigurePlayers extends Component {

  constructor(){
    super();
    this.state = {
      players: []
    }
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.refs.name.value !== ""){
      this.props.addPlayer(this.refs.name.value)
      this.refs.name.value = "";
    }
  }

  render() {
    let players;
    if(this.props.players){
      players = this.props.players.map(player => {
        return (
          <li>
            <span>
              {player}
            </span>
            <Fab size="small" onClick={() => this.props.removePlayer(player)} color="secondary" className={"fab"}>
              <DeleteIcon />
            </Fab>
          </li>
        );
      });
    }
    return (
      <div className="configure-players">
        <h3>Add Players</h3>
        <form className="add-player" onSubmit={this.handleSubmit.bind(this)}>
         <input placeholder="name" type="text" ref="name" required />
         <button type="submit"><PlusCircle /></button>

         </form>
        <ul className="list-group">{players}</ul>
      </div>
    );
  }
}

export default ConfigurePlayers;
