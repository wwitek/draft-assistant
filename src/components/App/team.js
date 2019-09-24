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
}

export default Team;
