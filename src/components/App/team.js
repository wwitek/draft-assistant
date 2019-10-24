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

  getName() {
    let starterCount = this.players.filter(p => p.IsStarter == 1).length;

    let positions = "";

    let guards = this.players.filter(
      p => p.Pos.filter(f => f.includes("G")).length > 0
    ).length;

    let forwards = this.players.filter(
      p => p.Pos.filter(f => f.includes("F")).length > 0
    ).length;
    let centers = this.players.filter(
      p => p.Pos.filter(f => f.includes("C")).length > 0
    ).length;

    return (
      this.name +
      "  -  [G:" +
      guards +
      " F:" +
      forwards +
      " C:" +
      centers +
      "]  -  (" +
      this.players.length +
      ")"
    );
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

  getStatsAndScore(prop, teams, betterLess) {
    let myStat = this.getStats(prop);
    let myScore = this.getScore(prop, teams, betterLess);
    return myScore + ". " + myStat;
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

  getTotalScoreNoTov(teams) {
    let totalScore = this.getScore("Fg", teams);
    totalScore += this.getScore("Ff", teams);
    totalScore += this.getScore("Thr", teams);
    totalScore += this.getScore("Pts", teams);
    totalScore += this.getScore("Reb", teams);
    totalScore += this.getScore("Ast", teams);
    totalScore += this.getScore("Stl", teams);
    totalScore += this.getScore("Blk", teams);
    return totalScore;
  }

  tryPlayer(player, teams) {
    let currentScore = this.getTotalScore(teams);
    this.addPlayer(player);
    let newScore = this.getTotalScore(teams);
    this.removePlayer(player);
    return newScore - currentScore;
  }

  tryPlayerWithoutTov(player, teams) {
    let currentScore = this.getTotalScoreNoTov(teams);
    this.addPlayer(player);
    let newScore = this.getTotalScoreNoTov(teams);
    this.removePlayer(player);
    return newScore - currentScore;
  }
}

export default Team;
