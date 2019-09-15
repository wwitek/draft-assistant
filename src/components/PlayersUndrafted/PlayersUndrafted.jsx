import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import Player from "../Player/Player";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import "./PlayersUndrafted.css";

class PlayersUndrafted extends Component {
  state = {
    playerNames: this.props.players,
    playerFilter: ""
  };

  handleChange(event) {
    this.setState({
      playerFilter: event.target.value
    });
  }

  getPlayers() {
    let players = [];
    let counter = 0;
    let playerFilter = this.state.playerFilter.toLowerCase();
    players = this.state.playerNames
      .filter(function(name) {
        if (!playerFilter) return true;
        return name.toLowerCase().includes(playerFilter);
      })
      .map(name => (
        <ListGroup.Item key={name}>
          <Player playerId={++counter} playerName={name} />
        </ListGroup.Item>
      ));
    return players;
  }

  render() {
    return (
      <div>
        <div>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <ListGroup variant="flush">{this.getPlayers()}</ListGroup>
        </div>
      </div>
    );
  }
}

export default PlayersUndrafted;
