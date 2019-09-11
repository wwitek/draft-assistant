import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import "./Draft.css";
import PlayersDrafted from "../PlayersDrafted/PlayersDrafted";
import PlayersUndrafted from "../PlayersUndrafted/PlayersUndrafted";

class Draft extends Component {
  render() {
    return (
      <Container>
        <Row>
          <PlayersDrafted />
        </Row>
        <Row>
          <PlayersUndrafted />
        </Row>
      </Container>
    );
  }
}

export default Draft;
