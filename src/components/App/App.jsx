import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Draft from "./../Draft/Draft";
import SplitterLayout from "react-splitter-layout";
import "./App.css";
import "react-splitter-layout/lib/index.css";
import Team from "./team";
const { ipcRenderer } = window.require("electron");

class App extends Component {
  state = {
    currentPick: 1,
    pickTable: [],
    teams: [],
    draftedPlayers: [],
    undraftedPlayers: []
  };

  constructor(props) {
    super(props);
    const teamsBackward = [...props.teams].sort((ob1, ob2) => {
      if (ob1.pick < ob2.pick) {
        return 1;
      } else if (ob1.pick > ob2.pick) {
        return -1;
      }
    });
    let pickCounter = 0;
    let pickTable = [];
    for (let round = 1; round <= props.totalRounds; round++) {
      if (round % 2) {
        props.teams.forEach(team => {
          let pick = { pick: ++pickCounter, team: team.pick };
          pickTable.push(pick);
        });
      } else {
        teamsBackward.forEach(team => {
          let pick = { pick: ++pickCounter, team: team.pick };
          pickTable.push(pick);
        });
      }
    }
    this.state = {
      currentPick: 1,
      pickTable: pickTable,
      teams: props.teams,
      draftedPlayers: [],
      undraftedPlayers: props.players
    };
  }

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
      let currentPick = this.state.pickTable[this.state.currentPick - 1];
      if (currentPick) {
        let teams = [...this.state.teams];
        teams[currentPick.team - 1].addPlayer(pickedPlayer);

        const draftedPlayers = this.state.draftedPlayers;
        draftedPlayers.push(pickedPlayer);

        const undraftedPlayers = this.state.undraftedPlayers.filter(
          player => player.Name !== pickedPlayer.Name
        );

        this.setState({
          currentPick: this.state.currentPick + 1,
          teams: teams,
          undraftedPlayers: undraftedPlayers,
          draftedPlayers: draftedPlayers
        });

        console.log(
          `Pick ${currentPick.pick}: Team ${currentPick.team} picked ${pickedPlayer.Name}`
        );
      } else {
        console.log("Error: Cannot pick anymore players. All teams are full");
      }
    }
  }

  unpickPlayer(id) {
    let unpickedPlayer = this.state.draftedPlayers.find(p => p.Id === id);
    if (unpickedPlayer) {
      let { draftedPlayers } = this.state;
      if (draftedPlayers.length > 0) {
        if (draftedPlayers[draftedPlayers.length - 1] === unpickedPlayer) {
          let currentPick = this.state.pickTable[this.state.currentPick - 2];
          let teams = [...this.state.teams];

          teams[currentPick.team - 1].removePlayer(unpickedPlayer);

          const draftedPlayers = this.state.draftedPlayers.filter(
            player => player.Name !== unpickedPlayer.Name
          );

          let undraftedPlayers = this.state.undraftedPlayers;
          undraftedPlayers.push(unpickedPlayer);
          undraftedPlayers.sort((a, b) => {
            return a.Adp > b.Adp ? 1 : -1;
          });

          this.setState({
            currentPick: this.state.currentPick - 1,
            teams: teams,
            undraftedPlayers: undraftedPlayers,
            draftedPlayers: draftedPlayers
          });

          console.log(
            `Unpicked pick ${currentPick.pick}: Team ${currentPick.team} unpicked ${unpickedPlayer.Name}`
          );
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
