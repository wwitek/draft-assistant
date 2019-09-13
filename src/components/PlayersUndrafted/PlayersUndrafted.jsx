import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import Player from "../Player/Player";
import "./PlayersUndrafted.css";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

class PlayersUndrafted extends Component {
  state = {};
  render() {
    const players = [];
    for (var i = 0; i < 550; i++) {
      players.push(
        <ListGroup.Item>
          <Player />
        </ListGroup.Item>
      );
    }

    return (
      <SplitterLayout
        vertical
        primaryIndex={1}
        secondaryInitialSize={32}
        secondaryMinSize={32}
      >
        <div>
          <Form.Control size="sm" type="text" placeholder="Search player" />
        </div>
        <div>
          <ListGroup variant="flush">{players}</ListGroup>
        </div>
      </SplitterLayout>
    );
  }
}

export default PlayersUndrafted;
