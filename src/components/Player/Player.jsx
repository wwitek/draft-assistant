import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import "./Player.css";
class Player extends Component {
  render() {
    let { player } = this.props;
    return (
      <div className="d-flex small-font">
        <div className="flex-grow-1">
          <div>
            {player.Adp}. {player.Name}, {player.Pos.join(",")}
          </div>
        </div>
        <div>Button</div>
      </div>
    );
  }
}

export default Player;
