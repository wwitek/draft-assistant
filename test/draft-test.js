import chai from "chai";
import Draft from "../src/models/draft";
import PlayerProvider from "./helpers/player-provider";
import OpponentProvider from "./helpers/opponent-provider";

const should = chai.should();
const assert = chai.assert;

let playerProvider = new PlayerProvider();
let opponentProvider = new OpponentProvider();

let players = [];
let opponents = [];

function assertDraft(
  draft,
  expectedTotalRounds,
  expectedCurrentPick,
  expectedUndraftedCount,
  expectedDraftedCount,
  expectedOpponentsCount
) {
  assert.equal(
    draft.totalRounds,
    expectedTotalRounds,
    "draft should have " + expectedTotalRounds + " rounds"
  );
  assert.equal(
    draft.currentPick,
    expectedCurrentPick,
    "current pick should be " + expectedCurrentPick
  );
  assert.lengthOf(
    draft.undrafted,
    expectedUndraftedCount,
    "undrafted list should have " + expectedUndraftedCount + " players"
  );
  assert.lengthOf(
    draft.drafted,
    expectedDraftedCount,
    "drafted list should have " + expectedDraftedCount + " player"
  );
  assert.lengthOf(
    draft.opponents,
    expectedOpponentsCount,
    "opponents list should have " + expectedOpponentsCount + " opponents"
  );
}

function assertOpponent(opponent, expectedPlayersCount) {
  assert.lengthOf(
    opponent.players,
    expectedPlayersCount,
    "opponent #" +
      opponent.pick +
      " should have " +
      expectedPlayersCount +
      " players"
  );
}

describe("draft", function() {
  beforeEach(function(done) {
    players = playerProvider.getPlayers();
    opponents = opponentProvider.getOpponents();
    return done();
  });

  it("should be created", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);

    assertDraft(draft, totalRounds, 1, playersCount, 0, opponentCount);
  });

  it("shouldn't be able to undo the pick right after creation", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);
    let res = draft.undoPick();
    assert.isFalse(res);

    assertDraft(draft, totalRounds, 1, playersCount, 0, opponentCount);
  });

  it("should pick first player", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);
    draft.pick(4612);

    assertDraft(draft, totalRounds, 2, playersCount - 1, 1, opponentCount);
    assertOpponent(draft.opponents[0], 1);
    for (let i = 1; i < draft.opponents.length; i++) {
      assertOpponent(draft.opponents[i], 0);
    }
  });

  it("should pick first two players", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);
    draft.pick(4612);
    draft.pick(5352);

    assertDraft(draft, totalRounds, 3, playersCount - 2, 2, opponentCount);
    assertOpponent(draft.opponents[0], 1);
    assertOpponent(draft.opponents[1], 1);
    for (let i = 2; i < draft.opponents.length; i++) {
      assertOpponent(draft.opponents[i], 0);
    }
  });

  it("should let last opponent pick twice", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);

    // Trigger first 13 picks
    for (let i = 0; i < 13; i++) {
      draft.pick(players[i].playerId);
    }

    assertDraft(draft, totalRounds, 14, playersCount - 13, 13, opponentCount);
    for (let i = 0; i < draft.opponents.length - 1; i++) {
      assertOpponent(draft.opponents[i], 1);
    }
    assertOpponent(draft.opponents[11], 2);
  });

  it("should let last opponent pick twice, then undo 3 picks", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);

    // Trigger first 13 picks
    for (let i = 0; i < 13; i++) {
      draft.pick(players[i].playerId);
    }
    draft.undoPick();
    draft.undoPick();
    draft.undoPick();

    assertDraft(draft, totalRounds, 11, playersCount - 10, 10, opponentCount);
    for (let i = 0; i < draft.opponents.length - 2; i++) {
      assertOpponent(draft.opponents[i], 1);
    }
    assertOpponent(draft.opponents[10], 0);
    assertOpponent(draft.opponents[11], 0);
  });

  it("should do 27 picks, then undo 6 picks, then redo 6 picks", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;

    let draft = new Draft(totalRounds, players, opponents);

    // Trigger first 27 picks
    for (let i = 0; i < 27; i++) {
      draft.pick(players[i].playerId);
    }
    draft.undoPick();
    draft.undoPick();
    draft.undoPick();
    draft.undoPick();
    draft.undoPick();
    draft.undoPick();

    assertDraft(draft, totalRounds, 22, playersCount - 21, 21, opponentCount);
    assertOpponent(draft.opponents[0], 1);
    assertOpponent(draft.opponents[1], 1);
    assertOpponent(draft.opponents[2], 1);
    for (let i = 3; i < draft.opponents.length; i++) {
      assertOpponent(draft.opponents[i], 2);
    }

    for (let i = 21; i < 27; i++) {
      draft.pick(players[i].playerId);
    }
    assertOpponent(draft.opponents[0], 3);
    assertOpponent(draft.opponents[1], 3);
    assertOpponent(draft.opponents[2], 3);
    for (let i = 3; i < draft.opponents.length; i++) {
      assertOpponent(draft.opponents[i], 2);
    }
  });

  it("should do all picks", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;
    let totalPicks = totalRounds * opponentCount;

    let draft = new Draft(totalRounds, players, opponents);

    for (let i = 0; i < totalPicks; i++) {
      draft.pick(players[i].playerId);
    }

    assertDraft(
      draft,
      totalRounds,
      totalPicks + 1,
      playersCount - totalPicks,
      totalPicks,
      opponentCount
    );

    for (let i = 0; i < draft.opponents.length; i++) {
      assertOpponent(draft.opponents[i], 13);
    }

    let expectedPlayers = [
      5185,
      5471,
      5958,
      6015,
      4561,
      5318,
      4610,
      5842,
      5835,
      6165,
      4647,
      4906,
      5157
    ];

    let counter = 0;
    draft.opponents[3].players.forEach(element => {
      assert.equal(
        element.playerId,
        expectedPlayers[counter++],
        "Player " + counter + " (in 4th team) doesn't match"
      );
    });
  });

  it("should do all picks and unsuccessfully try to add one more", function() {
    let totalRounds = 13;
    let playersCount = players.length;
    let opponentCount = opponents.length;
    let totalPicks = totalRounds * opponentCount;

    let draft = new Draft(totalRounds, players, opponents);

    for (let i = 0; i < totalPicks; i++) {
      let res = draft.pick(players[i].playerId);
      assert.isTrue(res);
    }

    assertDraft(
      draft,
      totalRounds,
      totalPicks + 1,
      playersCount - totalPicks,
      totalPicks,
      opponentCount
    );

    let res = draft.pick(players[157].playerId);
    assert.isFalse(res);

    assertDraft(
      draft,
      totalRounds,
      totalPicks + 1,
      playersCount - totalPicks,
      totalPicks,
      opponentCount
    );

    for (let i = 0; i < draft.opponents.length; i++) {
      assertOpponent(draft.opponents[i], 13);
    }
  });
});
