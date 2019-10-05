import React, { Component } from "react";
import "./LeagueTable.css";

class LeagueTable extends Component {
  renderRows() {
    let renderedTeams = [];
    renderedTeams = this.props.teams.map(t => (
      <tr key={t.pick}>
        <td>
          {t.name} ({t.players.length})
        </td>
        <td>
          {t.getStats("Fg")} ({t.getScore("Fg", this.props.teams)})
        </td>
        <td>
          {t.getStats("Ft")} ({t.getScore("Ft", this.props.teams)})
        </td>
        <td>
          {t.getStats("Thr")} ({t.getScore("Thr", this.props.teams)})
        </td>
        <td>
          {t.getStats("Pts")} ({t.getScore("Pts", this.props.teams)})
        </td>
        <td>
          {t.getStats("Reb")} ({t.getScore("Reb", this.props.teams)})
        </td>
        <td>
          {t.getStats("Ast")} ({t.getScore("Ast", this.props.teams)})
        </td>
        <td>
          {t.getStats("Stl")} ({t.getScore("Stl", this.props.teams)})
        </td>
        <td>
          {t.getStats("Blk")} ({t.getScore("Blk", this.props.teams)})
        </td>
        <td>
          {t.getStats("Tov")} ({t.getScore("Tov", this.props.teams, true)})
        </td>
        <td>{t.getTotalScore(this.props.teams)}</td>
      </tr>
    ));
    return renderedTeams;
  }

  render() {
    let rows = this.renderRows();
    return (
      <table>
        <thead>
          <tr>
            <td width="100">Name</td>
            <td>FG%</td>
            <td>FT%</td>
            <td>3PT</td>
            <td>PTS</td>
            <td>REB</td>
            <td>AST</td>
            <td>STL</td>
            <td>BLK</td>
            <td>TOV</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default LeagueTable;
