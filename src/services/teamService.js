import Team from "./../components/App/team";

const teams = [
  new Team(1, "Team A"),
  new Team(2, "Team B"),
  new Team(3, "Team C"),
  new Team(4, "Team D"),
  new Team(5, "Team E"),
  new Team(6, "Team F"),
  new Team(7, "Team G"),
  new Team(8, "Team H"),
  new Team(9, "Team I"),
  new Team(10, "Team J"),
  new Team(11, "Team K"),
  new Team(12, "Team L")
];

export function getTeams() {
  return teams;
}

function getCategoryScore(category, teams) {}

export function getTeamScore(teamId, teams) {}
