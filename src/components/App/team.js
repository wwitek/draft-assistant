class Team {
  constructor(pick, name) {
    this.pick = pick;
    this.name = name;
    this.players = [];
    this.stats = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.Id !== player.Id);
  }

  getStats(prop) {
    if (prop === "Fg") {
      let fgm = this.getStats("Fgm");
      let fga = this.getStats("Fga");
      let avg = (fgm / fga).toFixed(3);
      if (avg === "NaN") return 0;
      return avg;
    } else if (prop === "Ft") {
      let ftm = this.getStats("Ftm");
      let fta = this.getStats("Fta");
      let avg = (ftm / fta).toFixed(3);
      if (avg === "NaN") return 0;
      return avg;
    } else {
      return this.players.reduce(function(a, b) {
        return a + b[prop];
      }, 0);
    }
  }
}

export default Team;
