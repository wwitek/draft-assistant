import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Draft from "./../Draft/Draft";
import SplitterLayout from "react-splitter-layout";
import "./App.css";
import "react-splitter-layout/lib/index.css";
import { getPlayers } from "../../services/playerService";
const { ipcRenderer } = window.require("electron");

class App extends Component {
  state = {
    draftedPlayers: [],
    undraftedPlayers: getPlayers()
  };

  componentDidMount() {
    ipcRenderer.on("onReceivedPicks", (event, args) => {
      args.forEach(pick => {
        this.pickPlayer(pick.playerId);
      });
    });
  }

  pickPlayer(id) {
    let pickedPlayer = this.state.undraftedPlayers.find(p => p.Id == id);
    if (pickedPlayer) {
      console.log("Picked:", pickedPlayer.Name);
      const draftedPlayers = this.state.draftedPlayers;
      draftedPlayers.push(pickedPlayer);

      const undraftedPlayers = this.state.undraftedPlayers.filter(
        player => player.Name !== pickedPlayer.Name
      );

      this.setState({
        undraftedPlayers: undraftedPlayers,
        draftedPlayers: draftedPlayers
      });
    }
  }

  unpickPlayer(id) {
    let unpickedPlayer = this.state.draftedPlayers.find(p => p.Id === id);
    if (unpickedPlayer) {
      let { draftedPlayers } = this.state;
      if (draftedPlayers.length > 0) {
        if (draftedPlayers[draftedPlayers.length - 1] === unpickedPlayer) {
          console.log("Unpicked:", unpickedPlayer.Name);
          const draftedPlayers = this.state.draftedPlayers.filter(
            player => player.Name !== unpickedPlayer.Name
          );

          let undraftedPlayers = this.state.undraftedPlayers;
          undraftedPlayers.push(unpickedPlayer);
          undraftedPlayers.sort((a, b) => {
            return a.Adp > b.Adp ? 1 : -1;
          });

          this.setState({
            undraftedPlayers: undraftedPlayers,
            draftedPlayers: draftedPlayers
          });
        }
      }
    }
  }

  playerPicked = p => {
    this.pickPlayer(p.Id);
  };

  playerUnpicked = p => {
    this.unpickPlayer(p.Id);
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
