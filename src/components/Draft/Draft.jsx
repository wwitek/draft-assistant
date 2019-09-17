import React, { Component } from "react";
import { Container, Row, Form } from "react-bootstrap";
import PlayersDrafted from "../PlayersDrafted/PlayersDrafted";
import PlayersUndrafted from "../PlayersUndrafted/PlayersUndrafted";
import SplitterLayout from "react-splitter-layout";
import "./Draft.css";
import "react-splitter-layout/lib/index.css";

class Draft extends Component {
  state = {
    draftedPlayers: [],
    undraftedPlayers: [
      { id: 1, playerName: "James Harden", position: "SG" },
      { id: 2, playerName: "Paul George", position: "SF/PF" },
      { id: 3, playerName: "Giannis Antetokounmpo", position: "PF" },
      { id: 4, playerName: "Joel Embiid", position: "PF/C" },
      { id: 5, playerName: "LeBron James", position: "SF/PF" },
      { id: 6, playerName: "Stephen Curry", position: "PG/SG" },
      { id: 7, playerName: "Kawhi Leonard", position: "SF" },
      { id: 8, playerName: "Devin Booker", position: "SG" },
      { id: 9, playerName: "Kevin Durant", position: "SF" },
      { id: 10, playerName: "Anthony Davis", position: "PF" },
      { id: 11, playerName: "Damian Lillard", position: "PG" },
      { id: 12, playerName: "Kemba Walker", position: "PG" },
      { id: 13, playerName: "Bradley Beal", position: "SG" },
      { id: 14, playerName: "Blake Griffin", position: "PF" },
      { id: 15, playerName: "Karl-Anthony Towns", position: "PF" },
      { id: 16, playerName: "Kyrie Irving", position: "PG" },
      { id: 17, playerName: "Donovan Mitchell", position: "SG" },
      { id: 18, playerName: "Zach LaVine", position: "SG" },
      { id: 19, playerName: "Russell Westbrook", position: "PG" },
      { id: 20, playerName: "Klay Thompson", position: "SG" },
      { id: 21, playerName: "Julius Randle", position: "PF" },
      { id: 22, playerName: "LaMarcus Aldridge", position: "PF" },
      { id: 23, playerName: "DeMar DeRozan", position: "SF" },
      { id: 24, playerName: "Luka Doncic", position: "SG" },
      { id: 25, playerName: "Jrue Holiday", position: "PG" },
      { id: 26, playerName: "D'Angelo Russell", position: "PG" },
      { id: 27, playerName: "Mike Conley", position: "PG" },
      { id: 28, playerName: "CJ McCollum", position: "SG" },
      { id: 29, playerName: "Nikola Vucevic", position: "C" }
    ]
  };

  playerPicked = p => {
    console.log("Picked:", p.playerName);
    const draftedPlayers = this.state.draftedPlayers;
    draftedPlayers.push(p);

    const undraftedPlayers = this.state.undraftedPlayers.filter(
      player => player.playerName !== p.playerName
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
        console.log("Unpicked:", p.playerName);
        const draftedPlayers = this.state.draftedPlayers.filter(
          player => player.playerName !== p.playerName
        );

        let undraftedPlayers = this.state.undraftedPlayers;
        undraftedPlayers.push(p);
        undraftedPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));

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
        vertical
        primaryIndex={1}
        secondaryInitialSize={200}
        secondaryMinSize={200}
      >
        <div>
          <PlayersDrafted
            players={this.state.draftedPlayers}
            onPlayerUnpicked={this.playerUnpicked}
          />
        </div>
        <div>
          <PlayersUndrafted
            players={this.state.undraftedPlayers}
            onPlayerPicked={this.playerPicked}
          />
        </div>
      </SplitterLayout>
    );
  }
}

export default Draft;
