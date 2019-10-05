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

  getScore(prop, teams, betterLess) {
    let myScore = teams.length;
    let myStat = this.getStats(prop);
    teams.forEach(element => {
      if (element.pick !== this.pick) {
        let opponentStat = element.getStats(prop);
        if (opponentStat > myStat && !betterLess) {
          myScore--;
        } else if (opponentStat < myStat && betterLess) {
          myScore--;
        }
      }
    });
    return myScore;
  }

  getTotalScore(teams) {
    let totalScore = this.getScore("Fg", teams);
    totalScore += this.getScore("Ff", teams);
    totalScore += this.getScore("Thr", teams);
    totalScore += this.getScore("Pts", teams);
    totalScore += this.getScore("Reb", teams);
    totalScore += this.getScore("Ast", teams);
    totalScore += this.getScore("Stl", teams);
    totalScore += this.getScore("Blk", teams);
    totalScore += this.getScore("Tov", teams, true);
    return totalScore;
  }

  tryPlayer(player, teams) {
    let currentScore = this.getTotalScore(teams);
    this.addPlayer(player);
    let newScore = this.getTotalScore(teams);
    this.removePlayer(player);
    return newScore - currentScore;
  }
}

export default Team;
