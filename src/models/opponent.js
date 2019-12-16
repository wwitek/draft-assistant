export default class Opponent {
  constructor(name, pick) {
    this.name = name;
    this.pick = pick;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.playerId !== player.playerId);
  }
}
