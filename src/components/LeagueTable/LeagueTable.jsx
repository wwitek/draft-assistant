import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./LeagueTable.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

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
    const headerStyle = (colum, colIndex) => {
      let padding = "2px";

      return { width: "*", minWidth: "200px", padding: padding };
    };

    const statColStyle = (colum, colIndex) => {
      let padding = "2px";

      return { width: "50px", minWidth: "50px", padding: padding };
    };

    const rowStyle = (cell, row, rowIndex, colIndex) => {
      let padding = "2px";
      let backgroundColor = "#c8e6c9";
      if (rowIndex % 2 === 0) {
        backgroundColor = "#81c784";
      }
      return {
        padding: padding,
        backgroundColor: backgroundColor
      };
    };
    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true,
        headerStyle: headerStyle,
        style: rowStyle
      },
      {
        dataField: "fg",
        text: "Fg",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "ft",
        text: "Ft",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "thr",
        text: "3pt",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "pts",
        text: "Pts",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "reb",
        text: "Reb",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "ast",
        text: "Ast",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "stl",
        text: "Stl",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "blk",
        text: "Blk",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "tov",
        text: "Tov",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "totalNoTov",
        text: "NoTov",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      },
      {
        dataField: "total",
        text: "Total",
        sort: true,
        headerStyle: statColStyle,
        style: rowStyle
      }
    ];

    let products = [];
    this.props.teams.forEach(t => {
      products.push({
        id: t.pick,
        name: t.getName(),
        fg: t.getStats("Fg"),
        ft: t.getStats("Ft"),
        thr: t.getStats("Thr"),
        pts: t.getStats("Pts"),
        reb: t.getStats("Reb"),
        ast: t.getStats("Ast"),
        stl: t.getStats("Stl"),
        blk: t.getStats("Blk"),
        tov: t.getStats("Tov"),
        totalNoTov: t.getTotalScoreNoTov(this.props.teams),
        total: t.getTotalScore(this.props.teams)
      });
    });

    let scores = [];
    this.props.teams.forEach(t => {
      scores.push({
        id: t.pick,
        name: t.getName(),
        fg: t.getScore("Fg", this.props.teams),
        ft: t.getScore("Ft", this.props.teams),
        thr: t.getScore("Thr", this.props.teams),
        pts: t.getScore("Pts", this.props.teams),
        reb: t.getScore("Reb", this.props.teams),
        ast: t.getScore("Ast", this.props.teams),
        stl: t.getScore("Stl", this.props.teams),
        blk: t.getScore("Blk", this.props.teams),
        tov: t.getScore("Tov", this.props.teams, true),
        totalNoTov: t.getTotalScoreNoTov(this.props.teams),
        total: t.getTotalScore(this.props.teams)
      });
    });

    return (
      <div>
        <BootstrapTable keyField="id1" data={products} columns={columns} />
        <BootstrapTable keyField="id2" data={scores} columns={columns} />
      </div>
    );
  }
}

export default LeagueTable;
