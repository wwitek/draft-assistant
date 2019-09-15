import React, { Component } from "react";
import { Container, Row, ListGroup } from "react-bootstrap";
import Player from "../Player/Player";
import "./PlayersDrafted.css";

class PlayersDrafted extends Component {
  state = {};

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const players = [];
    for (var i = 0; i < 50; i++) {
      players.push(
        <ListGroup.Item key={i}>
          <Player playerName={"Drafted player"} />
        </ListGroup.Item>
      );
    }

    return (
      <div>
        <div>
          <ListGroup variant="flush">{players}</ListGroup>
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
