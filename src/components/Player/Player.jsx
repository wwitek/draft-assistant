import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";

class Player extends Component {
  render() {
    return (
      <div className="d-flex bd-highlight example-parent">
        <div className="p-2 flex-grow-1 bd-highlight col-example">Row</div>
        <div className="p-2 bd-highlight col-example">Button</div>
      </div>
    );
  }
}

export default Player;
