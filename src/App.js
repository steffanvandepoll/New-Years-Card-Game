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

    let introField;
    if(!this.state.started){
      introField = <div className="introField"><h1>Gifting game</h1></div>
    }

    return (
      <div className="App">
          {introField}
          {players}
          {startButton}
          {game}

          <h2>rules:</h2>
          <ul className="rules">
            <li>A minimum of 4 players is required to play the game</li>
            <li>No unwrapping the gifts!!! - in this game we value quantity over quality</li>
            <li>All costumes/outfits must be worn until the game is complete or they are replaced with another costume</li>
            <li>When all gifts are removed from the pile... gifttakers must resort to stealing...</li>
            <li>When stealing a gift.. be like Robin Hood... steal form the richest and gift to well... yourself!</li>
            <li>Drinking alcoholic consumptions during gameplay is advised</li>
            <li>This game has no real end, nor time limit... play untill you get sick of it</li>
          </ul>
      </div>
    );
  }
}

export default App;
