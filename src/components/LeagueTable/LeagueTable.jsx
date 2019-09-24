import React, { Component } from "react";

class LeagueTable extends Component {
  renderRows() {
    let renderedTeams = [];
    renderedTeams = this.props.teams.map(t => (
      <tr key={t.pick}>
        <td>{t.name}</td>
        <td>{t.getStats("Fg")}</td>
        <td>{t.getStats("Ft")}</td>
        <td>{t.getStats("Thr")}</td>
        <td>{t.getStats("Pts")}</td>
        <td>{t.getStats("Reb")}</td>
        <td>{t.getStats("Ast")}</td>
        <td>{t.getStats("Stl")}</td>
        <td>{t.getStats("Blk")}</td>
        <td>{t.getStats("Tov")}</td>
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
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default LeagueTable;
