const players = [];

export function getPlayers() {
  return players;
}

export function getPlayer(id) {
  return players.find(p => p.Id === id);
}
