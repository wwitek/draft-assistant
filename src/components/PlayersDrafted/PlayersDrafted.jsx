import React, { Component } from "react";
import { Container, Row, ListGroup } from "react-bootstrap";
import Player from "../Player/Player";
import "./PlayersDrafted.css";

class PlayersDrafted extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderPlayers() {
    let renderedPlayers = [];
    renderedPlayers = this.props.players.map(p => (
      <ListGroup.Item
        action
        key={p.Id}
        onClick={() => this.props.onPlayerUnpicked(p)}
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
          <ListGroup variant="flush">{this.renderPlayers()}</ListGroup>
        </div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default PlayersDrafted;
