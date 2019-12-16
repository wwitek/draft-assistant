import Opponent from "../../src/models/opponent";

export default class OpponentProvider {
  constructor() {}

  getOpponents() {
    let opponents = [
      new Opponent("Team A", 1),
      new Opponent("Team B", 2),
      new Opponent("Team C", 3),
      new Opponent("Team D", 4),
      new Opponent("Team E", 5),
      new Opponent("Team F", 6),
      new Opponent("Team G", 7),
      new Opponent("Team H", 8),
      new Opponent("Team I", 9),
      new Opponent("Team J", 10),
      new Opponent("Team K", 11),
      new Opponent("Team L", 12)
    ];
    return opponents;
  }
}
