import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import "./Player.css";
class Player extends Component {
  render() {
    let { player } = this.props;
    let playerClassName = "d-flex small-font";
    if (player.IsStarter) {
      playerClassName += " bold-font";
    }

    let goodPickClass = "";
    if (player.goodPickScale == 1) {
      goodPickClass = "space-margin good-pick-1";
    } else if (player.goodPickScale == 2) {
      goodPickClass = "space-margin good-pick-2";
    } else if (player.goodPickScale == 3) {
      goodPickClass = "space-margin good-pick-3";
    } else {
      goodPickClass = "space-margin";
    }
    return (
      <div className={playerClassName}>
        <div className="flex-grow-1">
          <div>
            {player.Adp}. {player.Name}, {player.Team}, {player.Pos.join(",")}
          </div>
        </div>
        <div className={goodPickClass}>{player.NoTovScore}</div>
        <div className="space-margin">{player.Score}</div>
      </div>
    );
  }
}

export default Player;
