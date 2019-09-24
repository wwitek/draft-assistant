import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { getPlayers } from "./services/playerService";
import { getTeams } from "./services/teamService";
import * as serviceWorker from "./service-worker";

ReactDOM.render(
  <App teams={getTeams()} players={getPlayers()} totalRounds={13} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
