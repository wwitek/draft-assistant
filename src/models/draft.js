export default class Draft {
  constructor(totalRounds, players, opponents) {
    this.currentPick = 1;
    this.totalRounds = totalRounds;
    this.undrafted = players;
    this.drafted = [];
    this.opponents = opponents;

    const opponentsBackward = [...this.opponents].sort((ob1, ob2) => {
      if (ob1.pick < ob2.pick) {
        return 1;
      } else if (ob1.pick > ob2.pick) {
        return -1;
      }
    });

    this.draftLine = [];
    let pickCounter = 0;
    for (let round = 1; round <= this.totalRounds; round++) {
      if (round % 2) {
        this.opponents.forEach(o => {
          let pick = { pick: ++pickCounter, team: o.pick };
          this.draftLine.push(pick);
        });
      } else {
        opponentsBackward.forEach(o => {
          let pick = { pick: ++pickCounter, team: o.pick };
          this.draftLine.push(pick);
        });
      }
    }
  }

  pick(playerId) {
    let pickedPlayer = this.undrafted.find(p => p.playerId == playerId);
    if (pickedPlayer) {
      let pick = this.draftLine[this.currentPick - 1];
      if (pick) {
        this.opponents[pick.team - 1].addPlayer(pickedPlayer);
        this.drafted.push(pickedPlayer);
        this.undrafted = this.undrafted.filter(
          p => p.playerId !== pickedPlayer.playerId
        );
        this.currentPick = this.currentPick + 1;

        return true;
      } else {
        // TODO: Pick was not found
        console.log("Pick was not found");
      }
    } else {
      // TODO: Player was not found
      console.log("Player was not found");
    }
    return false;
  }

  undoPick() {
    let lastPickedPlayer = this.drafted[this.drafted.length - 1];
    if (lastPickedPlayer) {
      let pick = this.draftLine[this.currentPick - 2];
      if (pick) {
        this.opponents[pick.team - 1].removePlayer(lastPickedPlayer);
        this.undrafted.push(lastPickedPlayer);
        this.drafted = this.drafted.filter(
          p => p.playerId !== lastPickedPlayer.playerId
        );
        this.currentPick = this.currentPick - 1;

        return true;
      } else {
        // TODO: Pick was not found
        console.log("Pick was not found");
      }
    } else {
      // TODO: Player was not found
      console.log("Player was not found");
    }
    return false;
  }
}
