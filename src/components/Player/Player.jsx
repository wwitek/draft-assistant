import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import "./Player.css";
class Player extends Component {
  state = {
    playerId: this.props.playerId,
    playerName: this.props.playerName
  };

  render() {
    return (
      <div className="d-flex small-font">
        <div className="flex-grow-1">
          <div>
            {this.state.playerId}. {this.state.playerName}
          </div>
        </div>
        <div>Button</div>
      </div>
    );
  }
}

export default Player;
