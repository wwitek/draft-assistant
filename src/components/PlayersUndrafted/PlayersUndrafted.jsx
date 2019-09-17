import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import Player from "../Player/Player";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import "./PlayersUndrafted.css";

class PlayersUndrafted extends Component {
  state = {
    playerFilter: ""
  };

  handleChange(event) {
    this.setState({
      playerFilter: event.target.value
    });
  }

  renderPlayers() {
    let renderedPlayers = [];
    let playerFilter = this.state.playerFilter.toLowerCase();
    renderedPlayers = this.props.players
      .filter(p => {
        if (!playerFilter) return true;
        return p.playerName.toLowerCase().includes(playerFilter);
      })
      .map(p => (
        <ListGroup.Item
          action
          key={p.id}
          onClick={() => this.props.onPlayerPicked(p)}
        >
          <Player player={p} />
        </ListGroup.Item>
      ));
    return renderedPlayers;
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
          <ListGroup variant="flush">{this.renderPlayers()}</ListGroup>
        </div>
      </div>
    );
  }
}

export default PlayersUndrafted;
