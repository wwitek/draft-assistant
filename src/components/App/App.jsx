import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import Draft from "./../Draft/Draft";

function App() {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Draft />
        </Col>
        <Col sm={8}>
          <p>Stats</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
