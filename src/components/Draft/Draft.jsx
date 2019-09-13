import React, { Component } from "react";
import { Container, Row, Form } from "react-bootstrap";
import PlayersDrafted from "../PlayersDrafted/PlayersDrafted";
import PlayersUndrafted from "../PlayersUndrafted/PlayersUndrafted";
import SplitterLayout from "react-splitter-layout";
import "./Draft.css";
import "react-splitter-layout/lib/index.css";

class Draft extends Component {
  render() {
    return (
      <SplitterLayout
        vertical
        primaryIndex={1}
        secondaryInitialSize={200}
        secondaryMinSize={200}
      >
        <div>
          <PlayersDrafted />
        </div>
        <div>
          <PlayersUndrafted />
        </div>
      </SplitterLayout>
    );
  }
}

export default Draft;
