import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Draft from "./../Draft/Draft";
import SplitterLayout from "react-splitter-layout";
import "./App.css";
import "react-splitter-layout/lib/index.css";
import { getPlayers } from "../../services/playerService";

class App extends Component {
  state = {
    draftedPlayers: [],
    undraftedPlayers: getPlayers()
  };

  playerPicked = p => {
    console.log("Picked:", p.Name);
    const draftedPlayers = this.state.draftedPlayers;
    draftedPlayers.push(p);

    const undraftedPlayers = this.state.undraftedPlayers.filter(
      player => player.Name !== p.Name
    );

    this.setState({
      undraftedPlayers: undraftedPlayers,
      draftedPlayers: draftedPlayers
    });
  };

  playerUnpicked = p => {
    let { draftedPlayers } = this.state;
    if (draftedPlayers.length > 0) {
      if (draftedPlayers[draftedPlayers.length - 1] === p) {
        console.log("Unpicked:", p.Name);
        const draftedPlayers = this.state.draftedPlayers.filter(
          player => player.Name !== p.Name
        );

        let undraftedPlayers = this.state.undraftedPlayers;
        undraftedPlayers.push(p);
        undraftedPlayers.sort((a, b) => {
          return a.Adp > b.Adp ? 1 : -1;
        });

        this.setState({
          undraftedPlayers: undraftedPlayers,
          draftedPlayers: draftedPlayers
        });
      }
    }
  };

  render() {
    return (
      <SplitterLayout
        primaryIndex={1}
        secondaryInitialSize={250}
        secondaryMinSize={250}
      >
        <div>
          <Draft
            undraftedPlayers={this.state.undraftedPlayers}
            draftedPlayers={this.state.draftedPlayers}
            onPlayerPicked={this.playerPicked}
            onPlayerUnpicked={this.playerUnpicked}
          />
        </div>
        <div>Pane 2</div>
      </SplitterLayout>
    );
  }
}

export default App;
