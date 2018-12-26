import React, { Component } from 'react';
import Game from './components/Game';
import ConfigurePlayers from './components/ConfigurePlayers';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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

class App extends Component {

  constructor(){
    super();
    this.playerMinimum = 1;
    this.state = {
      players: ["Steffan", "Marco", "Merijn","Sietkse"],
      started: false
    }
  }

  handleRemovePlayer(player){
    console.log("remove player");
    const index = this.state.players.indexOf(player);

    if(index !== -1){
      this.state.players.splice(index, 1);
      this.setState({
        players: this.state.players
      });
    }
  }

  handleAddPlayer(player){
    this.state.players.push(player);
    this.setState({
      players: this.state.players
    });
  }

  handleStart(){
    this.setState({
      started: true
    });
    console.log("startohh")
  }

  render() {
    let startButton;
    if(this.state.players.length >= this.playerMinimum && !this.state.started){
      startButton = <StyledButton variant="contained" onClick={this.handleStart.bind(this)} className="startButton">Start the game!</StyledButton>
    }

    let players;

    if(!this.state.started){
      players = <ConfigurePlayers players={this.state.players} addPlayer={this.handleAddPlayer.bind(this)} removePlayer={this.handleRemovePlayer.bind(this)}/>
    }

    let game;

    if(this.state.started){
      game = <Game players={this.state.players} />
    }

    return (
      <div className="App">

          <div className="introField">
            <h1>Gifting game</h1>
          </div>

          {players}
          {startButton}
          {game}

          <h2>rules:</h2>
          <ul>
            <li>A minimum of 4 players is required to play the game</li>
            <li>regel 3</li>
            <li>regel 4</li>
            <li>regel 5</li>
          </ul>
      </div>
    );
  }
}

export default App;
