import chai from "chai";
import Opponent from "../src/models/opponent";
import Player from "../src/models/player";

const should = chai.should();
const assert = chai.assert;

describe("opponent", function() {
  beforeEach(function(done) {
    return done();
  });

  it("should be created", function() {
    let opponent = new Opponent("Team A", 1);

    assert.equal(opponent.name, "Team A");
    assert.equal(opponent.pick, 1);
    assert.lengthOf(opponent.players, 0);
  });

  it("should add player", function() {
    let opponent = new Opponent("Team A", 1);

    let player = new Player(1, "Player1", "Team A", ["SG"]);

    opponent.addPlayer(player);
    assert.equal(opponent.name, "Team A");
    assert.equal(opponent.pick, 1);
    assert.lengthOf(opponent.players, 1);
  });

  it("should add 2 players", function() {
    let opponent = new Opponent("Team A", 1);

    let player1 = new Player(1, "Player1", "LAL", ["PG"]);
    let player2 = new Player(2, "Player2", "NYK", ["SG"]);

    opponent.addPlayer(player1);
    opponent.addPlayer(player2);
    assert.equal(opponent.name, "Team A");
    assert.equal(opponent.pick, 1);
    assert.lengthOf(opponent.players, 2);
  });

  it("should add 2 players, then remove 1", function() {
    let opponent = new Opponent("Team A", 1);

    let player1 = new Player(1, "Player1", "LAL", ["PG"]);
    let player2 = new Player(2, "Player2", "NYK", ["SG"]);

    opponent.addPlayer(player1);
    opponent.addPlayer(player2);
    opponent.removePlayer(player1);

    let players = opponent.players.filter(p => p.playerId === 1);
    assert.lengthOf(players, 0, "player with id=1 should be removed");

    assert.equal(opponent.name, "Team A");
    assert.equal(opponent.pick, 1);
    assert.lengthOf(opponent.players, 1);
  });

  it("should add 2 players, then remove non-existing player", function() {
    let opponent = new Opponent("Team A", 1);

    let player1 = new Player(1, "Player1", "LAL", ["PG"]);
    let player2 = new Player(2, "Player2", "NYK", ["SG"]);
    let player3 = new Player(3, "Player3", "NYK", ["SG"]);

    opponent.addPlayer(player1);
    opponent.addPlayer(player2);
    opponent.removePlayer(player3);

    assert.equal(opponent.name, "Team A");
    assert.equal(opponent.pick, 1);
    assert.lengthOf(opponent.players, 2);

    assert.lengthOf(
      opponent.players.filter(p => p.playerId === 1),
      1,
      "player with id=1 should not be removed"
    );

    assert.lengthOf(
      opponent.players.filter(p => p.playerId === 2),
      1,
      "player with id=2 should not be removed"
    );
  });
});
