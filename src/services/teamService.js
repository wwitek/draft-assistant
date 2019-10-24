import Team from "./../components/App/team";

const teams = [
  new Team(1, "Team1"),
  new Team(2, "Team2"),
  new Team(3, "Team3"),
  new Team(4, "Team4"),
  new Team(5, "Team5"),
  new Team(6, "Team6"),
  new Team(7, "Team7"),
  new Team(8, "Team8"),
  new Team(9, "Team9"),
  new Team(10, "Team10"),
  new Team(11, "Team11"),
  new Team(12, "Team12")
];

export function getTeams() {
  return teams;
}

function getCategoryScore(category, teams) {}

export function getTeamScore(teamId, teams) {}
